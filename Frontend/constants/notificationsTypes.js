const createNotification = (type, data) => {
    switch (type) {
      case 'system_alert':
        return {
          id: data.id, 
          icon: require('../assets/icons/bell.png'), // Replace with your icon path
          title: 'System Alert!',
          content: data.alert,
          date: data.date,
        };
      case 'password_change': 
        return {
          id: data.id,
          icon: require('../assets/icons/password.png'), // Replace with your icon path
          title: 'Password Change!',
          content: `You tried changing your password. It was ${data.status}. If it wasn't you, please contact us.`,
          date: data.date,
        };
      case 'new_proposal':
        return {
          id: data.id,
          icon: require('../assets/icons/blueprint.png'), // Replace with your icon path
          title: 'New Request!',
          content: `${data.username} has requested you to join on their project ${data.project.title} till ${data.project.date} ${data.project.month} ${data.project.year}.`,
          date: data.date,
        };
      case 'proposal_status':
        return {
          id: data.id,
          icon: require('../assets/icons/request.png'), // Replace with your icon path
          title: 'New Reply!',
          content: `${data.username} has ${data.status} the proposal to join on your project ${data.project.title}.`,
          date: data.date,
        };
      case 'project_update':
        return {
          id: data.id,
          icon: require('../assets/icons/status.png'), // Replace with your icon path
          title: 'Project Update!',
          content: `The project ${data.project.title}'s progress is updated to ${data.progress}%`,
          date: data.date,
        };
      case 'task_update':
        return {
          id: data.id,
          icon: require('../assets/icons/projects.png'), // Replace with your icon path
          title: 'Task Update!',
          content: `Task ${data.task.number}: "${data.task.name}" of project "${data.project.title}" is completed.`,
          date: data.date,
        };
      case 'new_task':
        return {
          id: data.id,
          icon: require('../assets/icons/task.png'), // Replace with your icon path
          title: 'New Task!',
          content: `Task ${data.task.number}: "${data.task.name}" is assigned to you in project: ${data.project.title}.`,
          date: data.date,
        };
      case 'message_request':
        return {
          id: data.id,
          icon: require('../assets/icons/message.png'), // Replace with your icon path
          title: 'New Message!',
          content: `${data.username} wants to message you.`,
          date: data.date,
        };
      case 'test_results':
        return {
          id: data.id,
          icon: require('../assets/icons/test.png'), // Replace with your icon path
          title: 'Test Results!',
          content: `Your results of new test for ${data.test.name} has arrived. You scored ${data.test.score}% and your skill has been updated to ${data.test.update}%.`,
          date: data.date,
        };
      default:
        return null;
    }
  };
  
  export default createNotification;
  