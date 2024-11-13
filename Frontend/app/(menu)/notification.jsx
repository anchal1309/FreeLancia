import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import createNotification from '../../constants/notificationsTypes'; // Adjust the import path accordingly

const notificationsData = [
  createNotification('project_update', {
    id: '1',
    project: { title: 'Project Beta' },
    progress: 75,
    date: '2024-10-09 23:30',
  }), 
  createNotification('system_alert', {
    id: '2',
    alert: 'Your account settings have been updated.',
    date: '2024-10-09 17:00',
  }),
  createNotification('password_change', {
    id: '3',
    status: 'not changed due to some error',
    date: '2024-10-09 09:15',
  }),
  createNotification('password_change', {
    id: '4',
    status: 'changed successfully',
    date: '2024-10-09 06:45',
  }),
  createNotification('proposal_status', {
    id: '5',
    username: 'Archit7goel',
    project: { title: 'Project Beta' },
    status: 'Accepted',
    date: '2024-10-07 04:30',
  }),
  createNotification('new_task', {
    id: '6',
    project: { title: 'Project Beta' },
    task: { number: 1, name: 'Design New App' },
    date: '2024-10-09 11:30',
  }),
  createNotification('new_proposal', {
    id: '7',
    username: 'Archit7goel',
    project: { title: '"Project Sigma"', date: '24', month: 'December', year: '2024' },
    date: '2024-10-07 04:30',
  }),
  createNotification('task_update', {
    id: '8',
    project: { title: 'Project Beta' },
    task: { number: 1, name: 'Design New App' },
    date: '2024-11-13 11:30',
  }),
  createNotification('proposal_status', {
    id: '9',
    username: 'Archit7goel',
    project: { title: 'Project Beta' },
    status: 'Rejected',
    date: '2024-10-07 14:30',
  }),
  createNotification('message_request', {
    id: '10',
    username: 'Archit7goel',
    date: '2024-11-17 14:30',
  }),
  createNotification('test_results', {
    id: '11',
    test: { name: 'Content Writing', score: 76, update: 88, },
    date: '2024-11-13 11:30',
  }),
];



// Helper function to convert 12-hour format to 24-hour and provide an ordering factor
const convertToTimeValue = (timeString) => {
  const [time, modifier] = timeString.split(' ');
  let [hours, minutes] = time.split(':').map(Number);

  if (hours === 12) {
    hours = 0; // Convert 12 or 12 PM to 00 for AM, and it'll be adjusted for PM
  }

  if (modifier === 'PM') {
    hours += 12; // Adjust PM times to reflect the latter part of the day
  }

  return hours * 60 + minutes; // Convert everything to minutes for easier comparison
};

const NotificationItem = ({ notification }) => {
  const [clicked, setClicked] = useState(false);

  // Load the clicked state from async storage
  useEffect(() => {
    const loadClickedState = async () => {
      try {
        const storedClicked = await AsyncStorage.getItem(`notification_${notification.id}_clicked`);
        if (storedClicked === 'true') {
          setClicked(true);
        }
      } catch (error) {
        console.error('Error loading clicked state:', error);
      }
    };
    loadClickedState();
  }, [notification.id]);

  const handlePress = async () => {
    try {
      await AsyncStorage.setItem(`notification_${notification.id}_clicked`, 'true');
      setClicked(true);
    } catch (error) {
      console.error('Error saving clicked state:', error);
    }
  };

  // const resetAllNotifications = async (notificationIds) => {
  //   try {
  //     const resetPromises = notificationIds.map((id) =>
  //       AsyncStorage.removeItem(`notification_${id}_clicked`)
  //     );
  //     await Promise.all(resetPromises);
  //     console.log('All notifications clicked states have been reset.');
  //   } catch (error) {
  //     console.error('Error resetting notifications:', error);
  //   }
  // };
  
  // // Usage example:
  // resetAllNotifications(['1', '2', '3','4', '5', '6','7', '8', '9', '10', '11', '12', '13', '14', '15', '16',]);

  return (
    <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
      <View
        style={[
          styles.notificationBox,
          clicked ? styles.clickedNotificationBox : null,
        ]}
      >
        <Image source={notification.icon} style={styles.icon} />
        <View style={styles.notificationContent}>
          <Text style={styles.title}>{notification.title}</Text>
          <Text style={styles.content}>{notification.content}</Text>
          <Text style={styles.date}>{notification.date}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const NotificationsPage = () => {
  // Group notifications by date
  const groupedNotifications = notificationsData.reduce((acc, notification) => {
    const [date, time] = notification.date.split(' '); // Split into date and time parts
    if (!acc[date]) {
      acc[date] = [];
    }
    acc[date].push({ ...notification, time }); // Add time as separate key
    return acc;
  }, {});

  // Sort the notifications by date, and within each date, sort by time (descending)
  const renderNotifications = Object.entries(groupedNotifications)
    .sort((a, b) => new Date(b[0]) - new Date(a[0])) // Sort by date in descending order (latest date first)
    .map(([date, notifications]) => {
      // Sort the notifications within the same date by time (in descending order)
      const sortedNotifications = notifications.sort((a, b) => {
        const timeA = convertToTimeValue(a.time);
        const timeB = convertToTimeValue(b.time);
        return timeB - timeA; // Sort in descending order, latest time first
      });

      return (
        <View key={date} style={styles.dateGroup}>
          <Text style={styles.dateHeader}>{date}</Text>
          {sortedNotifications.map((notification) => (
            <NotificationItem key={notification.id} notification={notification} />
          ))}
        </View>
      );
    });

  return (
    <View style={styles.container}>
      <Text style={styles.pageTitle}>Notifications</Text>
      <FlatList
        data={renderNotifications}
        renderItem={({ item }) => item}
        keyExtractor={(_, index) => index.toString()}
      />
    </View>
  );
}; 


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#1d6b6b',
  },
  pageTitle: {
    fontSize: 27,
    fontWeight: 'bold',
    marginBottom: 16,
    marginTop: 50,
    textAlign: 'center',
    color: 'white',
  },
  dateGroup: {
    marginBottom: 18,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'white',
  },
  notificationBox: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 5,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: 'white',
    borderRadius: 8,
    backgroundColor: '#5df7ff55',
  },
  clickedNotificationBox: {
    borderColor: '#eb812a',
    borderWidth: 1,
  },
  icon: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  notificationContent: {
    flex: 1,
    marginBottom: 2,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  content: {
    fontSize: 14,
    color: 'white',
    marginBottom: 2,
  },
  date: {
    fontSize: 12,
    color: 'black',
    textAlign: 'right',
    fontWeight: 'bold',
  },
});

export default NotificationsPage;
