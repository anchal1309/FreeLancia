import { View, Text, Image } from 'react-native'
import { Tabs, Redirect } from 'expo-router'
import { icons } from '../../constants';

const TabIcon = ({ icon, color, name, focused }) => {
    return (
        <View 
            className="gap-1"
        >
            <Image
                source={icon}
                resizeMode='contain'
                style={{
                  width: focused ? 26:22, // or your preferred width
                  height: 24, // or your preferred height
                  tintColor: color, // Apply the color to the icon
                  alignSelf: 'center', // Centers the icon horizontally in its container
                  justifyContent: 'center', // Ensures the content is vertically centered
                  backgroundColor: 'transparent',
                  marginBottom: -5,
                }}
            />
            <Text
                style={{
                color: focused ? '#ffffff' : '#ffffff', // Change text color when focused or not
                fontWeight: focused ? 'bold' : 'normal', // Optional: bold text when focused
                fontSize: focused ? 14 : 11, // Adjust font size
                textAlign: 'center',
                backgroundColor: 'transparent',
                }}
            >
        {/* </Text><Text className={`${focused ? "font-psemibold" : "font-pregular"} text-xs justify-center`}> */}
                {name}
            </Text>
        </View>
    )
}

const TabsLayout = () => {
  return (
    <>
        <Tabs
            screenOptions={{
                tabBarShowLabel: false,
                headerShown: false,
                tabBarStyle: {
                    backgroundColor: '#2a546e', // Set your desired background color for the tab bar here
                    borderTopWidth: 0,          // Optional: Remove the border line on top of the tab bar
                  },
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.home}
                            color={"white"}
                            name="Home"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="freelancer"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.freelancer}
                            color={"white"}
                            name="Freelancer"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="add"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.add}
                            color={"white"}
                            name="Add"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="project"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.project}
                            color={"white"}
                            name="Project"
                            focused={focused}
                        />
                    )
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon={icons.me}
                            color={"white"}
                            name="Me"
                            focused={focused}
                        />
                    )
                }}
            />
        </Tabs>
    </>
  )
}

export default TabsLayout