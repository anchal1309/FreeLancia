import React, { useState } from 'react';

const notificationsData = [
  {
    id: 1,
    user: 'Mark Webber',
    action: 'reacted to your recent post',
    post: 'My first tournament today!',
    time: '1m ago',
  },
  {
    id: 2,
    user: 'Angela Gray',
    action: 'followed you',
    time: '5m ago',
  },
  {
    id: 3,
    user: 'Jacob Thompson',
    action: 'has joined your group',
    group: 'Chess Club',
    time: '1 day ago',
  },
  {
    id: 4,
    user: 'Rizky Hasanuddin',
    action: 'sent you a private message',
    message: `Hello, thanks for setting up the Chess Club. I've been a member for a few weeks now and I'm already having lots of fun and improving my game.`,
    time: '5 days ago',
  },
  // Add other notifications
];

export default function Notifications({ onClose }) {
  const [notifications, setNotifications] = useState(notificationsData);

  const markAllAsRead = () => {
    setNotifications((prevNotifications) =>
      prevNotifications.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  return (
    <div className="absolute right-6 top-20 mt-2 w-96 bg-white rounded-lg shadow-lg z-10">
      <div className="p-4 border-b flex justify-between">
        <h3 className="text-lg font-semibold">Notifications</h3>
        <button
          onClick={markAllAsRead}
          className="text-sm text-blue-600 hover:underline"
        >
          Mark all as read
        </button>
      </div>
      <ul>
        {notifications.map((notification) => (
          <li
            key={notification.id}
            className={`flex items-start p-4 ${
              notification.read ? 'bg-gray-100' : 'bg-white'
            }`}
          >
            {/* <img
              src={notification.avatar}
              alt={notification.user}
              className="w-10 h-10 rounded-full mr-4"
            /> */}
            <div>
              <p className="text-sm">
                <span className="font-semibold">{notification.user}</span>{' '}
                {notification.action}{' '}
                {notification.post && (
                  <span className="font-medium text-blue-600">
                    {notification.post}
                  </span>
                )}
                {notification.group && (
                  <span className="font-medium text-blue-600">
                    {notification.group}
                  </span>
                )}
              </p>
              {notification.message && (
                <p className="text-sm text-gray-600 mt-1">
                  {notification.message}
                </p>
              )}
              <p className="text-xs text-gray-400 mt-1">{notification.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}