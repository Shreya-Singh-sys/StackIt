import { Question, Answer } from '../types';

export const sampleQuestions: Question[] = [
  {
    id: '1',
    title: 'How to join 2 columns in a data set to make a separate column in SQL',
    content: 'I do not know the code for it as I am a beginner. As an example what I need to do is like there is a column 1 containing First name, and column 2 consists of last name I want a column to combine both of them.',
    tags: ['sql', 'database', 'beginner'],
    votes: 5,
    answers: 3,
    views: 127,
    author: 'John Doe',
    authorAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&crop=face',
    timeAgo: '2 hours ago',
    isAnswered: true
  },
  {
    id: '2',
    title: 'React useState hook not updating state immediately',
    content: 'I\'m having trouble with React useState hook. When I call the setter function, the state doesn\'t seem to update immediately. How can I access the updated state right after setting it?',
    tags: ['react', 'javascript', 'hooks'],
    votes: 12,
    answers: 5,
    views: 245,
    author: 'Jane Smith',
    authorAvatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=40&h=40&fit=crop&crop=face',
    timeAgo: '4 hours ago',
    isAnswered: true
  },
  {
    id: '3',
    title: 'CSS Grid vs Flexbox: When to use which?',
    content: 'I\'m confused about when to use CSS Grid and when to use Flexbox. Can someone explain the differences and provide examples of when each should be used?',
    tags: ['css', 'layout', 'grid', 'flexbox'],
    votes: 8,
    answers: 0,
    views: 89,
    author: 'Mike Johnson',
    authorAvatar: 'https://images.pexels.com/photos/1310522/pexels-photo-1310522.jpeg?w=40&h=40&fit=crop&crop=face',
    timeAgo: '1 day ago',
    isAnswered: false
  },
  {
    id: '4',
    title: 'How to implement JWT authentication in Node.js',
    content: 'I\'m building a REST API with Node.js and Express, and I want to implement JWT authentication. What\'s the best practice for handling JWT tokens securely?',
    tags: ['nodejs', 'jwt', 'authentication', 'express'],
    votes: 15,
    answers: 7,
    views: 332,
    author: 'Sarah Wilson',
    authorAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?w=40&h=40&fit=crop&crop=face',
    timeAgo: '2 days ago',
    isAnswered: true
  },
  {
    id: '5',
    title: 'Python list comprehension vs for loop performance',
    content: 'I\'ve heard that list comprehensions are faster than regular for loops in Python. Is this true? And if so, why?',
    tags: ['python', 'performance', 'loops'],
    votes: 6,
    answers: 2,
    views: 156,
    author: 'David Chen',
    authorAvatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?w=40&h=40&fit=crop&crop=face',
    timeAgo: '3 days ago',
    isAnswered: true
  }
];

export const sampleAnswers: Answer[] = [
  {
    id: '1',
    questionId: '1',
    content: 'You can use the CONCAT function in SQL to combine columns. Here\'s the syntax:\n\nSELECT CONCAT(first_name, \' \', last_name) AS full_name FROM your_table;\n\nThis will create a new column called \'full_name\' that combines the first_name and last_name columns with a space in between.',
    votes: 8,
    author: 'Alice Developer',
    authorAvatar: 'https://images.pexels.com/photos/2381069/pexels-photo-2381069.jpeg?w=40&h=40&fit=crop&crop=face',
    timeAgo: '1 hour ago',
    isAccepted: true
  },
  {
    id: '2',
    questionId: '1',
    content: 'Another approach is to use the pipe operator (||) which is supported in some SQL databases:\n\nSELECT first_name || \' \' || last_name AS full_name FROM your_table;\n\nThis does the same thing as CONCAT but with different syntax.',
    votes: 3,
    author: 'Bob SQL Expert',
    authorAvatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=40&h=40&fit=crop&crop=face',
    timeAgo: '30 minutes ago',
    isAccepted: false
  },
  {
    id: '3',
    questionId: '2',
    content: 'The useState hook is asynchronous, which means the state won\'t update immediately. If you need to perform an action with the updated state, use the useEffect hook:\n\nconst [count, setCount] = useState(0);\n\nuseEffect(() => {\n  // This will run whenever count changes\n  console.log(count);\n}, [count]);',
    votes: 12,
    author: 'React Expert',
    authorAvatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=40&h=40&fit=crop&crop=face',
    timeAgo: '2 hours ago',
    isAccepted: true
  }
];