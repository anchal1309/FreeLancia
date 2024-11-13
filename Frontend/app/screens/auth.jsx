import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRouter, Link } from 'expo-router';
import Icon from "react-native-vector-icons/Feather";
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CommonActions } from '@react-navigation/native';
import { Dimensions } from 'react-native';

// Get device width
const { width } = Dimensions.get("window");

const DarkGridAuth = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    username: '',
    phone: '',
    email: '', 
    password: '',
    department: '',
    designation: '',
    role: 'Officer'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [generatedOtp, setGeneratedOtp] = useState(null);
  const [otpSent, setOtpSent] = useState(false);  // New state to check if OTP is sent
  const [userOtp, setUserOtp] = useState('');  // New state for user-entered OTP
  const router = useRouter();

  const handleNext = async () => {
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    setGeneratedOtp(otp);
  
    const requestBody = {
      email: formData.email,
      use: "Registration",
      text: `Hello ${formData.username},\n\nYour OTP for the account registration is ${otp}\n\nThank you,\nCityforge Team`,
    };
  
    try {
      const response = await axios.post('http://192.168.111.178:8080/api/v1/email/send-otp', requestBody);
  
      if (response.status === 200) {
        console.log(`OTP sent to ${formData.email}: ${otp}`);
        // Navigate to Verification screen with the OTP
        // router.push({
        //   pathname: 'Verification', 
        //   params: { otp, formData }
        // });
      } else {
        Alert.alert('Error', 'Failed to send OTP. Please try again.');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'An error occurred while sending OTP.');
    }
  };

  const handleInputChange = (field, value) => {
    if (field === 'phone') {
      value = formatPhoneNumber(value); // Ensure phone number is limited to 10 digits
    }
    if (field === 'username') {
      value = formatUserName(value); // Ensure username is limited to 20 digits
    }
    setFormData(prev => ({ ...prev, [field]: value }));
    validateField(field, value);
  };

  const validateField = (field, value) => {
    let error = '';
    switch (field) {
      case 'name':
        error = !/^[A-Za-z\s]{2,}$/.test(value) ? "Name must contain only letters and be at least 2 characters long." : "";
        break;
      case 'username':
        error = !/^[A-Za-z0-9_]{3,20}$/.test(value) ? "Username must be 3-20 characters and can only contain letters, numbers, and underscores." : "";
        break;
      case 'phone':
        error = !/^[6-9][0-9]{9}$/.test(value) ? "Phone number must be 10 digits starting with 6-9." : "";
        break;
      case 'email':
        error = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? "Please enter a valid email address." : "";
        break;
      case 'password':
        error = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(value) ? "Password must be at least 6 characters long, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character." : "";
        break;
      case 'department':
      case 'designation':
        error = value === "placeholder" ? `Please select a valid ${field}.` : "";
        break;
    }
    setErrors(prev => ({ ...prev, [field]: error }));
  };

  const handleSubmit = async () => {
    // Clear existing errors
    setErrors({});
  
    // Determine fields to validate based on the mode (registering or logging in)
    const fieldsToValidate = isRegistering ? Object.keys(formData) : ['username', 'password', 'phone'];
    fieldsToValidate.forEach((key) => validateField(key, formData[key]));
  
    // Check for validation errors or empty required fields
    if (Object.values(errors).some((error) => error !== "") || 
        fieldsToValidate.some((key) => formData[key] === "")) {
      Alert.alert("Form Error", "Please correct the errors in the form.");
      return;
    }
  
    try {
      if (isRegistering) {
        // Check if OTP has already been sent
        if (!otpSent) {
          // Generate OTP and set up request to send it via email
          const otp = Math.floor(1000 + Math.random() * 9000).toString();
          setGeneratedOtp(otp);
  
          const requestBody = { email: formData.email, otp: otp };
          const response = await axios.post('http://192.168.111.1788080/api/v1/email/send-otp', requestBody);
  
          if (response.status === 200) {
            setOtpSent(true); // Display OTP input after sending
            Alert.alert("OTP Sent", `OTP sent to ${formData.email}`);
          } else {
            Alert.alert('Error', 'Failed to send OTP. Please try again.');
          }
          return; // Exit here until OTP is entered and verified
        }
  
        // Verify OTP entered by the user
        if (userOtp !== generatedOtp) {
          Alert.alert("Invalid OTP", "The OTP you entered is incorrect.");
          return;
        }
  
        // Proceed with registration after OTP verification
        Alert.alert("Please Wait", "Your information is being authorized...");
  
        setTimeout(async () => {
          const response = await axios.post('http://192.168.111.178:8080/api/v1/users/register', {
            name: formData.name,
            username: formData.username,
            phone_no: formData.phone,
            email: formData.email,
            dept_name: formData.department,
            designation: formData.designation,
            password: formData.password,
            role: formData.role,
          });
  
          if (response.status === 201) {
            Alert.alert("Success", "Registration successful! Please log in.", [
              { text: "OK", onPress: () => setIsRegistering(false) }
            ]);
          } else {
            Alert.alert('Error', 'Registration failed. Please try again.');
          }
        }, 2000); // 2-second delay for authorization
      } else {
        // Login API call
        const response = await axios.post('http://192.168.111.178:8080/api/v1/users/login', {
          username: formData.username,
          password: formData.password,
          phone_no: formData.phone,
        });
  
        const { token, role } = response.data;
  
        // Store the token in AsyncStorage
        await AsyncStorage.setItem('authToken', token);
  
        // Fetch and store user profile
        await fetchAndStoreUserProfile(token);
  
        // Navigate to home page after successful login
        Alert.alert("Success", "Login successful!", [
          {
            text: "OK",
            onPress: () => router.replace('/home'),
          },
        ]);
      }
    } catch (error) {
      console.error(error);
      Alert.alert("Error", isRegistering ? "Registration failed!" : "Login failed!");
    }
  };


      // Resend OTP function
      const handleResendOtp = () => {
        handleNext();
      };


      // Fetch user profile data
      const fetchAndStoreUserProfile = async (token) => {
        try {
          const response = await axios.get('http://192.168.111.178:8080/api/v1/users/profile', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const userProfile = response.data;
          await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
        } catch (error) {
          console.error('Failed to fetch profile:', error);
          Alert.alert('Error', 'Failed to load profile');
        }
      };
  
  

  const toggleAuthMode = () => setIsRegistering(!isRegistering);

  const formatPhoneNumber = (value) => {
    const cleanedValue = value.replace(/[^0-9]/g, '');
    return cleanedValue.slice(0, 10); // Limit the value to 10 digits
  };

  const formatUserName = (value) => {
    const cleanedValue = value.replace(/[^A-Za-z0-9_]/g, '');
    return cleanedValue.slice(0, 20); // Limit the username to a maximum of 20 characters
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
      <View className="flex-1 bg-[#021C2C] pt-20 px-8">
        {/* <Text className="text-white text-3xl font-bold mb-8 text-center">
          {isRegistering ? "Register Your Account" : "Sign In To Your Account"}
        </Text> */}
        <Text
          className="text-white font-bold mb-8 text-center"
          style={{
            fontSize: width * 0.08, // Adjust font size based on device width
          }}
          adjustsFontSizeToFit
          numberOfLines={1} // Allow text to wrap into two lines if necessary
        >
          {isRegistering ? "Register Your Account" : "Sign In To Your Account"}
        </Text>
        
        <View className="flex-1">
          {isRegistering ? (
            <>
              <InputField
                placeholder="Name"
                value={formData.name}
                onChangeText={(value) => handleInputChange('name', value)}
                error={errors.name}
              />
              <InputField
                placeholder="Username"
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                error={errors.username}
              />
              <InputField
                placeholder="Phone Number"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                error={errors.phone}
              />
              <InputField
                placeholder="Email"
                value={formData.email}
                onChangeText={(value) => handleInputChange('email', value)}
                keyboardType="email-address"
                error={errors.email}
              />
            </>
          ) : (
            <>
              <InputField
                placeholder="Username"
                value={formData.username}
                onChangeText={(value) => handleInputChange('username', value)}
                error={errors.username}
              />
              <InputField
                placeholder="Phone Number"
                value={formData.phone}
                onChangeText={(value) => handleInputChange('phone', value)}
                keyboardType="phone-pad"
                error={errors.phone}
              />
            </>
          )}
          
          <View className="relative mb-4">
            <TextInput
              className="bg-[#e0ecfe] p-4 rounded-md text-[#021C2C] font-pmedium"
              placeholder="Password"
              placeholderTextColor="#021C2C"
              secureTextEntry={!showPassword}
              value={formData.password}
              onChangeText={(value) => handleInputChange('password', value)}
            />
            <TouchableOpacity
              className="absolute right-4 top-4"
              onPress={() => setShowPassword(!showPassword)}
            >
              <Icon
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="black"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text className="text-[#ff0000] mb-4">{errors.password}</Text>}
          
          {isRegistering && (
            <>
              <PickerField
                selectedValue={formData.department}
                onValueChange={(value) => handleInputChange('department', value)}
                items={[
                  { label: "Insert Your Department Name", value: "placeholder" },
                  { label: "Delhi Development Authority", value: "dda" },
                  { label: "Delhi Urban Arts Commission", value: "duac" },
                  { label: "National Capital Region Planning Board", value: "ncrpb" },
                  { label: "National Institute of Urban Affairs", value: "niau" },
                  { label: "National Buildings Organisation", value: "nbo" },
                ]}
                error={errors.department}
              />
              
              <PickerField
                selectedValue={formData.designation}
                onValueChange={(value) => handleInputChange('designation', value)}
                items={[
                  { label: "Insert Your Job Designation", value: "placeholder" },
                  { label: "Officer", value: "officer" },
                  { label: "Employee", value: "employee" },
                  { label: "Technical Expert", value: "technical_expert" },
                ]}
                error={errors.designation}
              />
              
              <RoleSelector
                role={formData.role}
                onRoleChange={(value) => handleInputChange('role', value)}
              />

                                        {/* OTP Input and Resend OTP Button */}
            {otpSent && (
              <View className="mb-4">
                <InputField
                  placeholder="Enter OTP"
                  value={userOtp}
                  onChangeText={(value) => setUserOtp(value)}
                  keyboardType="numeric"
                  maxLength={4}
                  error={errors.otp}
                />
                <TouchableOpacity onPress={handleResendOtp} className="self-end mt-2">
                  <Text className="text-[#1df4ff] font-pmedium">Resend OTP</Text>
                </TouchableOpacity>
              </View>
            )}
            </>
          )}
        </View>
        
        <View className="mt-4">
          {/* <Link href="/home" asChild> */}
            <TouchableOpacity
              className="bg-[#1df4ff42] p-4 rounded-md mb-5"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center text-xl font-bold">
                {isRegistering ? "Register" : "Login"}
              </Text>
            </TouchableOpacity>
          {/* </Link> */}
          
          <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
            <Text className="text-white">
            {isRegistering ? "Already have an account?   " : "Don't have an account?    "}
            </Text>
            <TouchableOpacity onPress={toggleAuthMode}>
              <Text className="text-white font-bold">
              {isRegistering ? "Login" : "Register"}
              </Text>
            </TouchableOpacity>
          </View>
          
          <Text className="text-[#868d9b] text-center mt-4 mb-6">
            By continuing, you agree to our Terms of Service and Privacy Policy.
          </Text>
        </View>
      </View>
    </ScrollView>
  );
};

const InputField = ({ placeholder, value, onChangeText, keyboardType, error, secureTextEntry }) => (
  <View className="mb-4">
    <TextInput
      className="bg-[#e0ecfe] p-4 rounded-md text-[#021C2C] font-pmedium"
      placeholder={placeholder}
      placeholderTextColor="#021C2C"
      value={value}
      onChangeText={onChangeText}
      keyboardType={keyboardType}
      secureTextEntry={secureTextEntry}
    />
    {error && <Text className="text-[#ff0000] mt-1">{error}</Text>}
  </View>
);

const PickerField = ({ selectedValue, onValueChange, items, error }) => (
  <View className="mb-4">
    <View className="bg-[#e0ecfe] text-[#021c2c] p-1 rounded-md ">
      <Picker
        selectedValue={selectedValue}
        onValueChange={onValueChange}
        style={{ color: '#021C2C', backgroundColor: '#e0ecfe' }}
        itemStyle={{ color: '#fffff', }}
      >
        {items.map((item, index) => (
          <Picker.Item key={index} label={item.label} value={item.value} />
        ))}
      </Picker>
    </View>
    {error && <Text className="text-[#ff0000] mt-1">{error}</Text>}
  </View>
);

const RoleSelector = ({ role, onRoleChange }) => (
  <View className="flex-row items-center mb-4">
    {["Head", "Officer"].map((option) => (
      <TouchableOpacity
        key={option}
        className={`flex-row items-center p-2 mr-4 ${
          role === option ? "bg-[#e0ecfe]" : "bg-[#e0ecfe]"
        } rounded-md`}
        onPress={() => onRoleChange(option)}
      >
        <View
          className={`w-6 h-6 border-2 border-[#021C2C] rounded-full ${
            role === option ? "bg-[#e0ecfe]" : "bg-[#021C2C]"
          }`}
        />
        <Text className={`text-[#021C2C] ml-2 ${role === option ? "font-bold" : ""}`}>
          {option}
        </Text>
      </TouchableOpacity>
    ))}
  </View>
);

export default DarkGridAuth;

// ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

// before adding authetication

// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
// import { useRouter, Link } from 'expo-router';
// import Icon from "react-native-vector-icons/Feather";
// import { Picker } from '@react-native-picker/picker';
// import { CommonActions } from '@react-navigation/native';
// import { Dimensions } from 'react-native';

// // Get device width
// const { width } = Dimensions.get("window");

// const DarkGridAuth = () => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     phone: '',
//     email: '',
//     password: '',
//     department: '',
//     designation: '',
//     role: 'Officer'
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   const handleInputChange = (field, value) => {
//     if (field === 'phone') {
//       value = formatPhoneNumber(value); // Ensure phone number is limited to 10 digits
//     }
//     if (field === 'username') {
//       value = formatUserName(value); // Ensure username is limited to 20 digits
//     }
//     setFormData(prev => ({ ...prev, [field]: value }));
//     validateField(field, value);
//   };

//   const validateField = (field, value) => {
//     let error = '';
//     switch (field) {
//       case 'name':
//         error = !/^[A-Za-z\s]{2,}$/.test(value) ? "Name must contain only letters and be at least 2 characters long." : "";
//         break;
//       case 'username':
//         error = !/^[A-Za-z0-9_]{3,20}$/.test(value) ? "Username must be 3-20 characters and can only contain letters, numbers, and underscores." : "";
//         break;
//       case 'phone':
//         error = !/^[6-9][0-9]{9}$/.test(value) ? "Phone number must be 10 digits starting with 6-9." : "";
//         break;
//       case 'email':
//         error = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? "Please enter a valid email address." : "";
//         break;
//       case 'password':
//         error = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(value) ? "Password must be at least 6 characters long, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character." : "";
//         break;
//       case 'department':
//       case 'designation':
//         error = value === "placeholder" ? `Please select a valid ${field}.` : "";
//         break;
//     }
//     setErrors(prev => ({ ...prev, [field]: error }));
//   };

//   const handleSubmit = () => {
//     const newErrors = {};
//     Object.keys(formData).forEach(key => validateField(key, formData[key]));
  
//     if (Object.values(errors).some(error => error !== "") || 
//         Object.values(formData).some(value => value === "")
//     ) {
//       Alert.alert("Form Error", "Please correct the errors in the form.");
//     } else {
//       console.log("Form submitted:", formData);

//       if (isRegistering) {
//         // Show alert after 2 seconds to simulate information authorization
//         Alert.alert("Please Wait", "Your information is being authorized...");
        
//         setTimeout(() => {
//             // Registration successful, switch to login mode after 2 seconds
//             Alert.alert("Success", "Registration successful! Please log in.", [
//               { text: "OK", onPress: () => setIsRegistering(false) }
//             ]);
//         }, 2000); // 2 second delay
//       } else {
//         // Login successful, redirect to main stack
//         Alert.alert("Success", "Login successful!", [
//           { 
//             text: "OK", 
//             onPress: () => {
//               router.replace('/home');
//             }
//           }
//         ]);
//       }
//     }
//   };
  

//   const toggleAuthMode = () => setIsRegistering(!isRegistering);

//   const formatPhoneNumber = (value) => {
//     const cleanedValue = value.replace(/[^0-9]/g, '');
//     return cleanedValue.slice(0, 10); // Limit the value to 10 digits
//   };

//   const formatUserName = (value) => {
//     const cleanedValue = value.replace(/[^A-Za-z0-9_]/g, '');
//     return cleanedValue.slice(0, 20); // Limit the username to a maximum of 20 characters
//   };

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
//       <View className="flex-1 bg-[#021C2C] pt-20 px-8">
//         {/* <Text className="text-white text-3xl font-bold mb-8 text-center">
//           {isRegistering ? "Register Your Account" : "Sign In To Your Account"}
//         </Text> */}
//         <Text
//           className="text-white font-bold mb-8 text-center"
//           style={{
//             fontSize: width * 0.08, // Adjust font size based on device width
//           }}
//           adjustsFontSizeToFit
//           numberOfLines={1} // Allow text to wrap into two lines if necessary
//         >
//           {isRegistering ? "Register Your Account" : "Sign In To Your Account"}
//         </Text>
        
//         <View className="flex-1">
//           {isRegistering ? (
//             <>
//               <InputField
//                 placeholder="Name"
//                 value={formData.name}
//                 onChangeText={(value) => handleInputChange('name', value)}
//                 error={errors.name}
//               />
//               <InputField
//                 placeholder="Username"
//                 value={formData.username}
//                 onChangeText={(value) => handleInputChange('username', value)}
//                 error={errors.username}
//               />
//               <InputField
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChangeText={(value) => handleInputChange('phone', value)}
//                 keyboardType="phone-pad"
//                 error={errors.phone}
//               />
//               <InputField
//                 placeholder="Email"
//                 value={formData.email}
//                 onChangeText={(value) => handleInputChange('email', value)}
//                 keyboardType="email-address"
//                 error={errors.email}
//               />
//             </>
//           ) : (
//             <>
//               <InputField
//                 placeholder="Username"
//                 value={formData.username}
//                 onChangeText={(value) => handleInputChange('username', value)}
//                 error={errors.username}
//               />
//               <InputField
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChangeText={(value) => handleInputChange('phone', value)}
//                 keyboardType="phone-pad"
//                 error={errors.phone}
//               />
//             </>
//           )}
          
//           <View className="relative mb-4">
//             <TextInput
//               className="bg-[#e0ecfe] p-4 rounded-md text-[#021C2C] font-pmedium"
//               placeholder="Password"
//               placeholderTextColor="#021C2C"
//               secureTextEntry={!showPassword}
//               value={formData.password}
//               onChangeText={(value) => handleInputChange('password', value)}
//             />
//             <TouchableOpacity
//               className="absolute right-4 top-4"
//               onPress={() => setShowPassword(!showPassword)}
//             >
//               <Icon
//                 name={showPassword ? "eye-off" : "eye"}
//                 size={24}
//                 color="black"
//               />
//             </TouchableOpacity>
//           </View>
//           {errors.password && <Text className="text-[#ff0000] mb-4">{errors.password}</Text>}
          
//           {isRegistering && (
//             <>
//               <PickerField
//                 selectedValue={formData.department}
//                 onValueChange={(value) => handleInputChange('department', value)}
//                 items={[
//                   { label: "Insert Your Department Name", value: "placeholder" },
//                   { label: "Delhi Development Authority", value: "dda" },
//                   { label: "Delhi Urban Arts Commission", value: "duac" },
//                   { label: "National Capital Region Planning Board", value: "ncrpb" },
//                   { label: "National Institute of Urban Affairs", value: "niau" },
//                   { label: "National Buildings Organisation", value: "nbo" },
//                 ]}
//                 error={errors.department}
//               />
              
//               <PickerField
//                 selectedValue={formData.designation}
//                 onValueChange={(value) => handleInputChange('designation', value)}
//                 items={[
//                   { label: "Insert Your Job Designation", value: "placeholder" },
//                   { label: "Officer", value: "officer" },
//                   { label: "Employee", value: "employee" },
//                   { label: "Technical Expert", value: "technical_expert" },
//                 ]}
//                 error={errors.designation}
//               />
              
//               <RoleSelector
//                 role={formData.role}
//                 onRoleChange={(value) => handleInputChange('role', value)}
//               />
//             </>
//           )}
//         </View>
        
//         <View className="mt-4">
//           {/* <Link href="/home" asChild> */}
//             <TouchableOpacity
//               className="bg-[#1df4ff42] p-4 rounded-md mb-5"
//               onPress={handleSubmit}
//             >
//               <Text className="text-white text-center text-xl font-bold">
//                 {isRegistering ? "Register" : "Login"}
//               </Text>
//             </TouchableOpacity>
//           {/* </Link> */}
          
//           <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
//             <Text className="text-white">
//             {isRegistering ? "Already have an account?   " : "Don't have an account?    "}
//             </Text>
//             <TouchableOpacity onPress={toggleAuthMode}>
//               <Text className="text-white font-bold">
//               {isRegistering ? "Login" : "Register"}
//               </Text>
//             </TouchableOpacity>
//           </View>
          
//           <Text className="text-[#868d9b] text-center mt-4 mb-6">
//             By continuing, you agree to our Terms of Service and Privacy Policy.
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// const InputField = ({ placeholder, value, onChangeText, keyboardType, error, secureTextEntry }) => (
//   <View className="mb-4">
//     <TextInput
//       className="bg-[#e0ecfe] p-4 rounded-md text-[#021C2C] font-pmedium"
//       placeholder={placeholder}
//       placeholderTextColor="#021C2C"
//       value={value}
//       onChangeText={onChangeText}
//       keyboardType={keyboardType}
//       secureTextEntry={secureTextEntry}
//     />
//     {error && <Text className="text-[#ff0000] mt-1">{error}</Text>}
//   </View>
// );

// const PickerField = ({ selectedValue, onValueChange, items, error }) => (
//   <View className="mb-4">
//     <View className="bg-[#e0ecfe] text-[#021c2c] p-1 rounded-md ">
//       <Picker
//         selectedValue={selectedValue}
//         onValueChange={onValueChange}
//         style={{ color: '#021C2C', backgroundColor: '#e0ecfe' }}
//         itemStyle={{ color: '#fffff', }}
//       >
//         {items.map((item, index) => (
//           <Picker.Item key={index} label={item.label} value={item.value} />
//         ))}
//       </Picker>
//     </View>
//     {error && <Text className="text-[#ff0000] mt-1">{error}</Text>}
//   </View>
// );

// const RoleSelector = ({ role, onRoleChange }) => (
//   <View className="flex-row items-center mb-4">
//     {["Head", "Officer"].map((option) => (
//       <TouchableOpacity
//         key={option}
//         className={`flex-row items-center p-2 mr-4 ${
//           role === option ? "bg-[#e0ecfe]" : "bg-[#e0ecfe]"
//         } rounded-md`}
//         onPress={() => onRoleChange(option)}
//       >
//         <View
//           className={`w-6 h-6 border-2 border-[#021C2C] rounded-full ${
//             role === option ? "bg-[#e0ecfe]" : "bg-[#021C2C]"
//           }`}
//         />
//         <Text className={`text-[#021C2C] ml-2 ${role === option ? "font-bold" : ""}`}>
//           {option}
//         </Text>
//       </TouchableOpacity>
//     ))}
//   </View>
// );

// export default DarkGridAuth;















// import React, { useState } from "react";
// import { View, Text, TextInput, TouchableOpacity, Alert, ScrollView } from "react-native";
// import { useRouter } from 'expo-router';
// import axios from 'axios';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import Icon from "react-native-vector-icons/Feather";
// import { Picker } from '@react-native-picker/picker';

// const DarkGridAuth = () => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [formData, setFormData] = useState({
//     name: '',
//     username: '',
//     phone: '',
//     email: '',
//     password: '',
//     department: '',
//     designation: '',
//     role: 'Officer' // Default role
//   });
//   const [errors, setErrors] = useState({});
//   const [showPassword, setShowPassword] = useState(false);
//   const router = useRouter();

//   // Handle input changes and validate only relevant fields based on auth mode
//   const handleInputChange = (field, value) => {
//     setFormData(prev => ({ ...prev, [field]: value }));
//     validateField(field, value);
//   };

//   // Validation for both registration and login
//   const validateField = (field, value) => {
//     let error = '';

//     if (isRegistering) {
//       // Registration validation
//       switch (field) {
//         case 'name':
//           error = !/^[A-Za-z\s]{2,}$/.test(value) ? "Name must contain only letters and be at least 2 characters long." : "";
//           break;
//         case 'username':
//           error = !/^[A-Za-z0-9_]{3,20}$/.test(value) ? "Username must be 3-20 characters and can only contain letters, numbers, and underscores." : "";
//           break;
//         case 'phone':
//           error = !/^[6-9][0-9]{9}$/.test(value) ? "Phone number must be 10 digits starting with 6-9." : "";
//           break;
//         case 'email':
//           error = !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value) ? "Please enter a valid email address." : "";
//           break;
//         case 'password':
//           error = !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(value) ? "Password must be at least 6 characters long, include 1 uppercase, 1 lowercase, 1 digit, and 1 special character." : "";
//           break;
//         case 'department':
//           error = value === "placeholder" ? "Please select a valid department." : "";
//           break;
//         case 'designation':
//           error = value === "placeholder" ? "Please select a valid designation." : "";
//           break;
//         case 'role':
//           error = value === "placeholder" ? "Please select a role." : "";
//           break;
//       }
//     } else {
//       // Login validation (username, password, and phone number)
//       if (field === 'username') {
//         error = !/^[A-Za-z0-9_]{3,20}$/.test(value) ? "Username must be 3-20 characters long." : "";
//       }
//       if (field === 'password') {
//         error = value.length < 6 ? "Password must be at least 6 characters long." : "";
//       }
//       if (field === 'phone') {
//         error = !/^[6-9][0-9]{9}$/.test(value) ? "Phone number must be 10 digits starting with 6-9." : "";
//       }
//     }
//     setErrors(prev => ({ ...prev, [field]: error }));
//   };

//   // Handle form submission based on auth mode
//   const handleSubmit = async () => {
//     // Clear existing errors
//     setErrors({});

//     // Validate all fields before submission
//     const fieldsToValidate = isRegistering ? Object.keys(formData) : ['username', 'password', 'phone'];
//     fieldsToValidate.forEach(key => validateField(key, formData[key]));

//     // Check for validation errors
//     if (Object.values(errors).some(error => error !== "") || 
//         fieldsToValidate.some(key => formData[key] === "")) {
//       Alert.alert("Form Error", "Please correct the errors in the form.");
//       return;
//     }

//     try {
//       if (isRegistering) {
//         // Registration API call
//         const response = await axios.post('http://192.168.68.141:8080/api/v1/users/register', {
//           name: formData.name,
//           username: formData.username,
//           phone_no: formData.phone,
//           email: formData.email,
//           dept_name: formData.department,
//           designation: formData.designation,
//           password: formData.password,
//           role: formData.role
//         });

//         Alert.alert("Success", "Registration successful! Please log in.", [
//           { text: "OK", onPress: () => setIsRegistering(false) }
//         ]);
//       } else {
//         // Login API call
//         const response = await axios.post('http://192.168.68.141:8080/api/v1/users/login', {
//           username: formData.username,
//           password: formData.password,
//           phone_no: formData.phone
//         });

//         const { token, role } = response.data;

//         // Store the token in AsyncStorage
//         await AsyncStorage.setItem('authToken', token);

//         // Navigate to home page after successful login
//         Alert.alert("Success", "Login successful!", [
//           { text: "OK", onPress: () => router.replace('/home') }
//         ]);
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert("Error", isRegistering ? "Registration failed!" : "Login failed!");
//     }
//   };

//   // Toggle between registration and login mode
//   const toggleAuthMode = () => setIsRegistering(!isRegistering);

//   return (
//     <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
//       <View className="flex-1 bg-[#021C2C] pt-20 px-5">
//         <Text className="text-white text-3xl font-bold mb-8 text-center">
//           {isRegistering ? "Register Your Account" : "Sign In To Your Account"}
//         </Text>
        
//         <View className="flex-1">
//           {isRegistering ? (
//             <>
//               <InputField
//                 placeholder="Name"
//                 value={formData.name}
//                 onChangeText={(value) => handleInputChange('name', value)}
//                 error={errors.name}
//               />
//               <InputField
//                 placeholder="Username"
//                 value={formData.username}
//                 onChangeText={(value) => handleInputChange('username', value)}
//                 error={errors.username}
//               />
//               <InputField
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChangeText={(value) => handleInputChange('phone', value)}
//                 keyboardType="phone-pad"
//                 error={errors.phone}
//               />
//               <InputField
//                 placeholder="Email"
//                 value={formData.email}
//                 onChangeText={(value) => handleInputChange('email', value)}
//                 keyboardType="email-address"
//                 error={errors.email}
//               />
//               {/* <View className="relative mb-4">
//                 <TextInput
//                   className="bg-[#e0ecfe] p-4 rounded-md text-[#021C2C] font-pmedium"
//                   placeholder="Password"
//                   placeholderTextColor="#021C2C"
//                   secureTextEntry={!showPassword}
//                   value={formData.password}
//                   onChangeText={(value) => handleInputChange('password', value)}
//                 />
//                 <TouchableOpacity
//                   className="absolute right-4 top-4"
//                   onPress={() => setShowPassword(!showPassword)}
//                 >
//                   <Icon
//                     name={showPassword ? "eye-off" : "eye"}
//                     size={24}
//                     color="black"
//                   />
//                 </TouchableOpacity>
//               </View> */}
//           {/* {errors.password && <Text className="text-[#ff0000] mb-4">{errors.password}</Text>} */}
//               <PickerField
//                 selectedValue={formData.department}
//                 onValueChange={(value) => handleInputChange('department', value)}
//                 items={[
//                   { label: "Insert Your Department Name", value: "placeholder" },
//                   { label: "Delhi Development Authority", value: "dda" },
//                   { label: "Delhi Urban Arts Commission", value: "duac" },
//                   { label: "National Capital Region Planning Board", value: "ncrpb" },
//                   { label: "National Institute of Urban Affairs", value: "niau" },
//                   { label: "National Buildings Organisation", value: "nbo" },
//                 ]}
//                 error={errors.department}
//               />
//               <PickerField
//                 selectedValue={formData.designation}
//                 onValueChange={(value) => handleInputChange('designation', value)}
//                 items={[
//                   { label: "Insert Your Job Designation", value: "placeholder" },
//                   { label: "Officer", value: "officer" },
//                   { label: "Employee", value: "employee" },
//                   { label: "Technical Expert", value: "technical_expert" },
//                 ]}
//                 error={errors.designation}
//               />
//               <RoleSelector
//                 role={formData.role}
//                 onRoleChange={(value) => handleInputChange('role', value)}
//               />
//             </>
//           ) : (
//             <>
//               <InputField
//                 placeholder="Username"
//                 value={formData.username}
//                 onChangeText={(value) => handleInputChange('username', value)}
//                 error={errors.username}
//               />
//               <InputField
//                 placeholder="Phone Number"
//                 value={formData.phone}
//                 onChangeText={(value) => handleInputChange('phone', value)}
//                 keyboardType="phone-pad"
//                 error={errors.phone}
//               />
//             </>
//           )}
          
//           <View className="relative mb-4">
//             <TextInput
//               className="bg-[#e0ecfe] p-4 rounded-md text-[#021C2C] font-pmedium"
//               placeholder="Password"
//               placeholderTextColor="#021C2C"
//               secureTextEntry={!showPassword}
//               value={formData.password}
//               onChangeText={(value) => handleInputChange('password', value)}
//             />
//             <TouchableOpacity
//               className="absolute right-4 top-4"
//               onPress={() => setShowPassword(!showPassword)}
//             >
//               <Icon
//                 name={showPassword ? "eye-off" : "eye"}
//                 size={24}
//                 color="black"
//               />
//             </TouchableOpacity>
//           </View>
//           {errors.password && <Text className="text-[#ff0000] mb-4">{errors.password}</Text>}
//         </View>
        
//         <View className="mt-4">
//           <TouchableOpacity
//             className="bg-[#1df4ff42] p-4 rounded-md mb-5"
//             onPress={handleSubmit}
//           >
//             <Text className="text-white text-center text-xl font-bold">
//               {isRegistering ? "Register" : "Login"}
//             </Text>
//           </TouchableOpacity>
          
//           {/* <Text className="text-white text-center px-1">
//             {isRegistering ? "Already have an account?   " : "Don't have an account?    "}
//             <TouchableOpacity onPress={toggleAuthMode}>
//               <Text className="text-white font-bold">{isRegistering ? "Login" : "Register"}</Text>
//             </TouchableOpacity>
//           </Text> */}

//           <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
//             <Text className="text-white">
//             {isRegistering ? "Already have an account?   " : "Don't have an account?    "}
//             </Text>
//             <TouchableOpacity onPress={toggleAuthMode}>
//               <Text className="text-white font-bold">
//               {isRegistering ? "Login" : "Register"}
//               </Text>
//             </TouchableOpacity>
//           </View>

          
//           <Text className="text-[#868d9b] text-center mt-4 mb-6">
//             By continuing, you agree to our Terms of Service and Privacy Policy.
//           </Text>
//         </View>
//       </View>
//     </ScrollView>
//   );
// };

// // Define InputField, PickerField, and RoleSelector components

// const InputField = ({ placeholder, value, onChangeText, keyboardType, error, secureTextEntry }) => (
//   <View className="mb-4">
//     <TextInput
//       className="bg-[#e0ecfe] p-4 rounded-md text-[#021C2C] font-pmedium"
//       placeholder={placeholder}
//       placeholderTextColor="#021C2C"
//       value={value}
//       onChangeText={onChangeText}
//       keyboardType={keyboardType}
//       secureTextEntry={secureTextEntry}
//     />
//     {error && <Text className="text-[#ff0000] mt-1">{error}</Text>}
//   </View>
// );

// const PickerField = ({ selectedValue, onValueChange, items, error }) => (
//   <View className="mb-4">
//     <View className="bg-[#e0ecfe] text-[#021c2c] p-1 rounded-md ">
//       <Picker
//         selectedValue={selectedValue}
//         onValueChange={onValueChange}
//         style={{ color: '#021C2C', backgroundColor: '#e0ecfe' }}
//         itemStyle={{ color: '#fffff', }}
//       >
//         {items.map((item, index) => (
//           <Picker.Item key={index} label={item.label} value={item.value} />
//         ))}
//       </Picker>
//     </View>
//     {error && <Text className="text-[#ff0000] mt-1">{error}</Text>}
//   </View>
// );

// const RoleSelector = ({ role, onRoleChange }) => (
//   <View className="flex-row items-center mb-4">
//     {["Head", "Officer"].map((option) => (
//       <TouchableOpacity
//         key={option}
//         className={`flex-row items-center p-2 mr-4 ${
//           role === option ? "bg-[#e0ecfe]" : "bg-[#e0ecfe]"
//         } rounded-md`}
//         onPress={() => onRoleChange(option)}
//       >
//         <View
//           className={`w-6 h-6 border-2 border-[#021C2C] rounded-full ${
//             role === option ? "bg-[#e0ecfe]" : "bg-[#021C2C]"
//           }`}
//         />
//         <Text className={`text-[#021C2C] ml-2 ${role === option ? "font-bold" : ""}`}>
//           {option}
//         </Text>
//       </TouchableOpacity>
//     ))}
//   </View>
// );

// export default DarkGridAuth;
