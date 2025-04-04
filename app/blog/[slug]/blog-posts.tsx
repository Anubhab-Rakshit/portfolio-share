"use client"

// Blog posts data
export const blogPosts = [
  {
    id: 1,
    title: "Building Responsive Web Applications with Next.js and Tailwind CSS",
    excerpt:
      "Learn how to create beautiful, responsive web applications using Next.js and Tailwind CSS. This guide covers everything from setup to deployment.",
    content: `
      <h2>Introduction</h2>
      <p>In today's digital landscape, creating responsive web applications is no longer optional—it's essential. Users access websites from a variety of devices with different screen sizes, from smartphones and tablets to desktop computers and even smart TVs. A responsive design ensures that your application looks and functions well across all these devices.</p>
      
      <p>Next.js and Tailwind CSS have emerged as powerful tools for building modern, responsive web applications. Next.js, a React framework, provides features like server-side rendering, static site generation, and API routes, while Tailwind CSS offers a utility-first approach to styling that makes it easy to create custom, responsive designs without writing custom CSS.</p>
      
      <h2>Setting Up Your Project</h2>
      <p>To get started with Next.js and Tailwind CSS, you'll need to set up a new project. First, ensure you have Node.js installed on your machine. Then, create a new Next.js project using the following command:</p>
      
      <pre><code>npx create-next-app my-responsive-app</code></pre>
      
      <p>Next, navigate to your project directory and install Tailwind CSS:</p>
      
      <pre><code>cd my-responsive-app
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p</code></pre>
      
      <p>Configure your tailwind.config.js file to include the paths to your template files:</p>
      
      <pre><code>module.exports = {
content: [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
],
theme: {
  extend: {},
},
plugins: [],
}</code></pre>
      
      <p>Finally, add the Tailwind directives to your CSS file:</p>
      
      <pre><code>@tailwind base;
@tailwind components;
@tailwind utilities;</code></pre>
      
      <h2>Creating Responsive Layouts</h2>
      <p>Tailwind CSS makes it easy to create responsive layouts using its built-in breakpoint prefixes: sm, md, lg, xl, and 2xl. These correspond to minimum widths of 640px, 768px, 1024px, 1280px, and 1536px, respectively.</p>
      
      <p>Here's an example of a responsive grid layout:</p>
      
      <pre><code>&lt;div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"&gt;
&lt;div className="bg-blue-500 p-4 text-white"&gt;Item 1&lt;/div&gt;
&lt;div className="bg-blue-500 p-4 text-white"&gt;Item 2&lt;/div&gt;
&lt;div className="bg-blue-500 p-4 text-white"&gt;Item 3&lt;/div&gt;
&lt;div className="bg-blue-500 p-4 text-white"&gt;Item 4&lt;/div&gt;
&lt;/div&gt;</code></pre>
      
      <p>This grid will display one column on mobile devices, two columns on small screens, three columns on medium screens, and four columns on large screens.</p>
      
      <h2>Responsive Typography</h2>
      <p>Tailwind also makes it easy to create responsive typography. You can use the same breakpoint prefixes to adjust font sizes, line heights, and other text properties based on screen size:</p>
      
      <pre><code>&lt;h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold"&gt;Responsive Heading&lt;/h1&gt;
&lt;p className="text-sm sm:text-base md:text-lg"&gt;This paragraph will adjust its size based on the screen width.&lt;/p&gt;</code></pre>
      
      <h2>Conclusion</h2>
      <p>Next.js and Tailwind CSS provide a powerful combination for building responsive web applications. Next.js offers the performance and developer experience benefits of React with additional features like server-side rendering and static site generation, while Tailwind CSS makes it easy to create custom, responsive designs without writing custom CSS.</p>
      
      <p>By leveraging the responsive utilities provided by Tailwind CSS, you can create web applications that look and function well across all devices, providing a great user experience regardless of how users access your site.</p>
    `,
    coverImage: "/placeholder.svg?height=400&width=800",
    date: "May 15, 2023",
    readTime: "8 min read",
    author: "Anubhab Rakshit",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Web Development",
    tags: ["Next.js", "Tailwind CSS", "Responsive Design", "Frontend"],
    slug: "building-responsive-web-applications",
  },
  {
    id: 2,
    title: "Implementing Authentication in React Applications",
    excerpt:
      "A comprehensive guide to implementing secure authentication in React applications using JWT, OAuth, and other modern authentication methods.",
    content: `
      <h2>Introduction to Authentication in React</h2>
      <p>Authentication is a critical aspect of modern web applications. It ensures that users are who they claim to be and provides a secure way to access protected resources. In React applications, implementing authentication requires careful consideration of various factors, including security, user experience, and maintainability.</p>
      
      <p>This guide will explore different authentication methods for React applications, focusing on JWT (JSON Web Tokens), OAuth, and other modern approaches.</p>
      
      <h2>JWT Authentication</h2>
      <p>JWT (JSON Web Tokens) is a popular method for implementing authentication in React applications. It's a compact, self-contained way to securely transmit information between parties as a JSON object.</p>
      
      <h3>How JWT Works</h3>
      <p>When a user logs in, the server validates their credentials and returns a JWT. This token is then stored on the client-side (usually in localStorage or an HTTP-only cookie) and sent with subsequent requests to authenticate the user.</p>
      
      <p>Here's a basic implementation of JWT authentication in a React application:</p>
      
      <pre><code>// Login function
const login = async (email, password) => {
  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    
    const data = await response.json();
    
    if (response.ok) {
      // Store the token
      localStorage.setItem('token', data.token);
      return true;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Login error:', error);
    return false;
  }
};

// Function to make authenticated requests
const fetchProtectedData = async () => {
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      throw new Error('No token found');
    }
    
    const response = await fetch('/api/protected-data', {
      headers: {
        'Authorization': \`Bearer \${token}\`,
      },
    });
    
    const data = await response.json();
    
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message);
    }
  } catch (error) {
    console.error('Error fetching protected data:', error);
    return null;
  }
};</code></pre>
      
      <h2>OAuth Authentication</h2>
      <p>OAuth is an open standard for access delegation, commonly used for implementing "Sign in with Google/Facebook/GitHub" functionality. It allows users to grant third-party applications access to their resources without sharing their credentials.</p>
      
      <h3>Implementing OAuth with React</h3>
      <p>There are several libraries available for implementing OAuth in React applications, such as react-oauth/google for Google authentication:</p>
      
      <pre><code>import { GoogleLogin } from '@react-oauth/google';

function GoogleLoginButton() {
  const handleSuccess = (credentialResponse) => {
    // Send the token to your backend
    console.log(credentialResponse);
  };

  const handleError = () => {
    console.log('Login Failed');
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={handleError}
      useOneTap
    />
  );
}</code></pre>
      
      <h2>Authentication Context</h2>
      <p>To manage authentication state across your React application, you can use the Context API to create an authentication context:</p>
      
      <pre><code>// AuthContext.js
import { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (token) {
          // Validate token with your API
          const response = await fetch('/api/validate-token', {
            headers: {
              'Authorization': \`Bearer \${token}\`,
            },
          });
          
          if (response.ok) {
            const userData = await response.json();
            setUser(userData);
          } else {
            // Invalid token, clear it
            localStorage.removeItem('token');
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
      } finally {
        setLoading(false);
      }
    };
    
    checkLoggedIn();
  }, []);

  const login = async (email, password) => {
    // Implementation of login function
  };

  const logout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}</code></pre>
      
      <h2>Protected Routes</h2>
      <p>To restrict access to certain routes based on authentication status, you can create a ProtectedRoute component:</p>
      
      <pre><code>import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
}</code></pre>
      
      <h2>Security Considerations</h2>
      <p>When implementing authentication in React applications, consider the following security best practices:</p>
      
      <ul>
        <li>Use HTTP-only cookies for storing tokens when possible to prevent XSS attacks.</li>
        <li>Implement token refresh mechanisms to handle token expiration.</li>
        <li>Use HTTPS to encrypt data in transit.</li>
        <li>Implement proper error handling and validation.</li>
        <li>Consider using a library like Auth0 or Firebase Authentication for production applications.</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>Implementing authentication in React applications requires careful consideration of security, user experience, and maintainability. By using modern authentication methods like JWT and OAuth, along with React's Context API for state management, you can create a secure and user-friendly authentication system for your applications.</p>
      
      <p>Remember that authentication is just one part of a comprehensive security strategy. Always follow security best practices and stay updated on the latest security threats and mitigations.</p>
    `,
    coverImage: "/placeholder.svg?height=400&width=800",
    date: "June 22, 2023",
    readTime: "12 min read",
    author: "Anubhab Rakshit",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Security",
    tags: ["React", "Authentication", "JWT", "OAuth", "Security"],
    slug: "implementing-authentication-react",
  },
  {
    id: 3,
    title: "Data Structures and Algorithms: A Practical Guide",
    excerpt:
      "Explore the most important data structures and algorithms with practical examples in JavaScript. Improve your problem-solving skills for technical interviews.",
    content: `
      <h2>Introduction to Data Structures and Algorithms</h2>
      <p>Data structures and algorithms form the foundation of computer science and software development. Understanding these concepts is crucial for writing efficient code, solving complex problems, and acing technical interviews.</p>
      
      <p>This guide provides a practical overview of essential data structures and algorithms, with examples in JavaScript to help you apply these concepts in your projects and interviews.</p>
      
      <h2>Arrays and Strings</h2>
      <p>Arrays and strings are the most basic data structures, but they're used in countless algorithms and interview questions.</p>
      
      <h3>Two-Pointer Technique</h3>
      <p>The two-pointer technique is a common approach for solving array problems efficiently. Here's an example of using two pointers to find a pair of numbers that sum to a target value:</p>
      
      <pre><code>function findPairWithSum(arr, target) {
  // Sort the array first
  arr.sort((a, b) => a - b);
  
  let left = 0;
  let right = arr.length - 1;
  
  while (left < right) {
    const sum = arr[left] + arr[right];
    
    if (sum === target) {
      return [arr[left], arr[right]];
    } else if (sum < target) {
      left++;
    } else {
      right--;
    }
  }
  
  return null; // No pair found
}

// Example usage
const numbers = [3, 1, 4, 6, 2, 8, 5];
const target = 10;
console.log(findPairWithSum(numbers, target)); // [2, 8]</code></pre>
      
      <h2>Linked Lists</h2>
      <p>Linked lists are linear data structures where elements are stored in nodes, and each node points to the next node in the sequence.</p>
      
      <h3>Implementing a Linked List</h3>
      <pre><code>class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.length = 0;
  }
  
  append(value) {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      this.tail.next = newNode;
      this.tail = newNode;
    }
    
    this.length++;
    return this;
  }
  
  prepend(value) {
    const newNode = new Node(value);
    
    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head = newNode;
    }
    
    this.length++;
    return this;
  }
  
  delete(value) {
    if (!this.head) return null;
    
    if (this.head.value === value) {
      this.head = this.head.next;
      this.length--;
      return this;
    }
    
    let current = this.head;
    
    while (current.next && current.next.value !== value) {
      current = current.next;
    }
    
    if (current.next) {
      if (current.next === this.tail) {
        this.tail = current;
      }
      
      current.next = current.next.next;
      this.length--;
    }
    
    return this;
  }
  
  toArray() {
    const array = [];
    let current = this.head;
    
    while (current) {
      array.push(current.value);
      current = current.next;
    }
    
    return array;
  }
}</code></pre>
      
      <h3>Reversing a Linked List</h3>
      <p>Reversing a linked list is a common interview question. Here's an implementation:</p>
      
      <pre><code>function reverseLinkedList(head) {
  let prev = null;
  let current = head;
  
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  
  return prev; // New head
}</code></pre>
      
      <h2>Stacks and Queues</h2>
      <p>Stacks and queues are linear data structures that follow specific patterns for adding and removing elements.</p>
      
      <h3>Stack Implementation</h3>
      <pre><code>class Stack {
  constructor() {
    this.items = [];
  }
  
  push(item) {
    this.items.push(item);
  }
  
  pop() {
    if (this.isEmpty()) return null;
    return this.items.pop();
  }
  
  peek() {
    if (this.isEmpty()) return null;
    return this.items[this.items.length - 1];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}</code></pre>
      
      <h3>Queue Implementation</h3>
      <pre><code>class Queue {
  constructor() {
    this.items = [];
  }
  
  enqueue(item) {
    this.items.push(item);
  }
  
  dequeue() {
    if (this.isEmpty()) return null;
    return this.items.shift();
  }
  
  front() {
    if (this.isEmpty()) return null;
    return this.items[0];
  }
  
  isEmpty() {
    return this.items.length === 0;
  }
  
  size() {
    return this.items.length;
  }
}</code></pre>
      
      <h2>Trees and Graphs</h2>
      <p>Trees and graphs are non-linear data structures that represent hierarchical or network relationships.</p>
      
      <h3>Binary Tree Implementation</h3>
      <pre><code>class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  
  insert(value) {
    const newNode = new TreeNode(value);
    
    if (!this.root) {
      this.root = newNode;
      return this;
    }
    
    const queue = [this.root];
    
    while (queue.length) {
      const current = queue.shift();
      
      if (!current.left) {
        current.left = newNode;
        return this;
      }
      
      if (!current.right) {
        current.right = newNode;
        return this;
      }
      
      queue.push(current.left);
      queue.push(current.right);
    }
  }
  
  // Depth-First Search (DFS) - Inorder traversal
  inorderTraversal(node = this.root, result = []) {
    if (node) {
      this.inorderTraversal(node.left, result);
      result.push(node.value);
      this.inorderTraversal(node.right, result);
    }
    
    return result;
  }
  
  // Breadth-First Search (BFS)
  levelOrderTraversal() {
    if (!this.root) return [];
    
    const result = [];
    const queue = [this.root];
    
    while (queue.length) {
      const current = queue.shift();
      result.push(current.value);
      
      if (current.left) queue.push(current.left);
      if (current.right) queue.push(current.right);
    }
    
    return result;
  }
}</code></pre>
      
      <h2>Sorting and Searching Algorithms</h2>
      <p>Sorting and searching are fundamental operations in computer science. Here are implementations of some common algorithms:</p>
      
      <h3>Quick Sort</h3>
      <pre><code>function quickSort(arr) {
  if (arr.length <= 1) return arr;
  
  const pivot = arr[Math.floor(arr.length / 2)];
  const left = arr.filter(x => x < pivot);
  const middle = arr.filter(x => x === pivot);
  const right = arr.filter(x => x > pivot);
  
  return [...quickSort(left), ...middle, ...quickSort(right)];
}</code></pre>
      
      <h3>Binary Search</h3>
      <pre><code>function binarySearch(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    
    if (arr[mid] === target) {
      return mid;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  
  return -1; // Target not found
}</code></pre>
      
      <h2>Dynamic Programming</h2>
      <p>Dynamic programming is a technique for solving complex problems by breaking them down into simpler subproblems.</p>
      
      <h3>Fibonacci Sequence with Memoization</h3>
      <pre><code>function fibonacci(n, memo = {}) {
  if (n in memo) return memo[n];
  if (n <= 1) return n;
  
  memo[n] = fibonacci(n - 1, memo) + fibonacci(n - 2, memo);
  return memo[n];
}</code></pre>
      
      <h2>Conclusion</h2>
      <p>This guide has covered some of the most important data structures and algorithms you'll encounter in software development and technical interviews. Practice implementing these concepts and solving problems to strengthen your understanding and problem-solving skills.</p>
      
      <p>Remember that the key to mastering data structures and algorithms is consistent practice and application. Try to solve at least one problem daily, and gradually increase the difficulty as you become more comfortable.</p>
    `,
    coverImage: "/placeholder.svg?height=400&width=800",
    date: "July 10, 2023",
    readTime: "15 min read",
    author: "Anubhab Rakshit",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Algorithms",
    tags: ["Data Structures", "Algorithms", "JavaScript", "Interview Prep"],
    slug: "data-structures-algorithms-guide",
  },
  {
    id: 4,
    title: "Getting Started with Next.js",
    excerpt: "A beginner-friendly guide to getting started with Next.js, the React framework for production.",
    content: `
      <h2>Introduction to Next.js</h2>
      <p>Next.js is a React framework that enables functionality such as server-side rendering, static site generation, and API routes. It's designed to make building React applications easier and more efficient, with built-in features that help you create production-ready applications.</p>
      
      <p>In this guide, we'll explore the basics of Next.js and how to get started with your first Next.js project.</p>
      
      <h2>Why Next.js?</h2>
      <p>Next.js offers several advantages over a plain React application:</p>
      
      <ul>
        <li><strong>Server-Side Rendering (SSR)</strong>: Renders pages on the server, improving performance and SEO.</li>
        <li><strong>Static Site Generation (SSG)</strong>: Pre-renders pages at build time for even better performance.</li>
        <li><strong>Incremental Static Regeneration (ISR)</strong>: Updates static pages after deployment without rebuilding the entire site.</li>
        <li><strong>API Routes</strong>: Build API endpoints as part of your Next.js application.</li>
        <li><strong>File-based Routing</strong>: Create routes based on the file structure in your pages directory.</li>
        <li><strong>Built-in CSS and Sass Support</strong>: Import CSS and Sass files directly in your components.</li>
        <li><strong>Image Optimization</strong>: Automatically optimize images for better performance.</li>
      </ul>
      
      <h2>Setting Up Your First Next.js Project</h2>
      <p>To create a new Next.js project, you can use the create-next-app command, which sets up everything automatically for you:</p>
      
      <pre><code>npx create-next-app my-next-app
cd my-next-app
npm run dev</code></pre>
      
      <p>This will create a new Next.js project in the my-next-app directory and start the development server. You can now open http://localhost:3000 in your browser to see your application.</p>
      
      <h2>Understanding the Project Structure</h2>
      <p>A typical Next.js project has the following structure:</p>
      
      <pre><code>my-next-app/
  ├── pages/
  │   ├── _app.js
  │   ├── index.js
  │   └── api/
  │       └── hello.js
  ├── public/
  │   └── favicon.ico
  ├── styles/
  │   ├── globals.css
  │   └── Home.module.css
  ├── .gitignore
  ├── next.config.js
  ├── package.json
  └── README.md</code></pre>
      
      <p>Let's break down the key directories and files:</p>
      
      <ul>
        <li><strong>pages/</strong>: Contains all your page components. Each file in this directory becomes a route in your application.</li>
        <li><strong>pages/_app.js</strong>: Custom App component that wraps all pages.</li>
        <li><strong>pages/api/</strong>: Contains API routes.</li>
        <li><strong>public/</strong>: Static assets like images, fonts, etc.</li>
        <li><strong>styles/</strong>: CSS files for your application.</li>
        <li><strong>next.config.js</strong>: Configuration file for Next.js.</li>
      </ul>
      
      <h2>Creating Your First Page</h2>
      <p>In Next.js, pages are React components exported from files in the pages directory. Let's create a simple page:</p>
      
      <pre><code>// pages/about.js
export default function About() {
  return (
    <div>
      <h1>About Us</h1>
      <p>This is the about page of our Next.js application.</p>
    </div>
  );
}</code></pre>
      
      <p>Now, if you navigate to http://localhost:3000/about, you'll see your new page.</p>
      
      <h2>Dynamic Routes</h2>
      <p>Next.js supports dynamic routes using brackets in the filename. For example, to create a page that displays a blog post based on its ID, you can create a file named [id].js in the pages/blog directory:</p>
      
      <pre><code>// pages/blog/[id].js
import { useRouter } from 'next/router';

export default function BlogPost() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div>
      <h1>Blog Post {id}</h1>
      <p>This is the content of blog post {id}.</p>
    </div>
  );
}</code></pre>
      
      <p>Now, if you navigate to http://localhost:3000/blog/1, http://localhost:3000/blog/2, etc., you'll see the corresponding blog post page with the ID displayed.</p>
      
      <h2>Data Fetching</h2>
      <p>Next.js provides several methods for fetching data:</p>
      
      <h3>getStaticProps</h3>
      <p>Use getStaticProps to fetch data at build time:</p>
      
      <pre><code>// pages/posts.js
export default function Posts({ posts }) {
  return (
    <div>
      <h1>Posts</h1>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getStaticProps() {
  // Fetch data from an API
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const posts = await res.json();

  return {
    props: {
      posts,
    },
  };
}</code></pre>
      
      <h3>getServerSideProps</h3>
      <p>Use getServerSideProps to fetch data on each request:</p>
      
      <pre><code>// pages/posts/[id].js
export default function Post({ post }) {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const res = await fetch(\`https://jsonplaceholder.typicode.com/posts/\${id}\`);
  const post = await res.json();

  return {
    props: {
      post,
    },
  };
}</code></pre>
      
      <h2>API Routes</h2>
      <p>Next.js allows you to create API endpoints as part of your application. These are server-side only and won't increase your client-side bundle size.</p>
      
      <pre><code>// pages/api/hello.js
export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' });
}</code></pre>
      
      <p>You can access this API endpoint at http://localhost:3000/api/hello.</p>
      
      <h2>Styling in Next.js</h2>
      <p>Next.js supports various styling options:</p>
      
      <h3>CSS Modules</h3>
      <p>CSS Modules allow you to scope CSS to a specific component:</p>
      
      <pre><code>// styles/Button.module.css
.button {
  padding: 10px 15px;
  background-color: blue;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

// components/Button.js
import styles from '../styles/Button.module.css';

export default function Button({ children }) {
  return (
    <button className={styles.button}>
      {children}
    </button>
  );
}</code></pre>
      
      <h3>Global Styles</h3>
      <p>You can add global styles in the _app.js file:</p>
      
      <pre><code>// pages/_app.js
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;</code></pre>
      
      <h2>Deploying Your Next.js Application</h2>
      <p>Next.js applications can be easily deployed to various platforms, but the easiest way is to use Vercel, the platform created by the creators of Next.js:</p>
      
      <ol>
        <li>Push your code to a Git repository (GitHub, GitLab, or Bitbucket).</li>
        <li>Import your repository on Vercel.</li>
        <li>Vercel will automatically detect that you're using Next.js and configure the build settings.</li>
        <li>Click "Deploy" and your application will be live in seconds.</li>
      </ol>
      
      <h2>Conclusion</h2>
      <p>Next.js provides a powerful framework for building React applications with features like server-side rendering, static site generation, and API routes. By following this guide, you should now have a basic understanding of how to create and deploy a Next.js application.</p>
      
      <p>As you continue your journey with Next.js, explore more advanced features like middleware, internationalization, and image optimization to create even more powerful applications.</p>
    `,
    coverImage: "/placeholder.svg?height=400&width=800",
    date: "August 5, 2023",
    readTime: "10 min read",
    author: "Anubhab Rakshit",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript", "Frontend"],
    slug: "getting-started-with-nextjs",
  },
  {
    id: 5,
    title: "3D Web Development with Three.js",
    excerpt: "Learn how to create immersive 3D experiences on the web using Three.js and React Three Fiber.",
    content: `
    <h2>Introduction to 3D Web Development</h2>
    <p>3D web development has evolved significantly over the years, allowing developers to create immersive experiences directly in the browser without requiring plugins. Three.js has emerged as one of the most popular libraries for 3D graphics on the web, providing a high-level API for WebGL.</p>
    
    <p>In this guide, we'll explore the fundamentals of 3D web development using Three.js and React Three Fiber, a React renderer for Three.js.</p>
    
    <h2>Getting Started with Three.js</h2>
    <p>Three.js is a JavaScript library that makes it easier to create 3D graphics in the browser using WebGL. Let's start by setting up a basic Three.js scene:</p>
    
    <pre><code>// Install Three.js
npm install three

// Basic Three.js scene
import * as THREE from 'three';

// Create a scene
const scene = new THREE.Scene();

// Create a camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// Create a renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Create a cube
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// Add lighting
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 1, 2);
scene.add(light);

// Animation loop
function animate() {
  requestAnimationFrame(animate);
  
  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;
  
  renderer.render(scene, camera);
}

animate();</code></pre>
    
    <p>This code creates a simple rotating cube with lighting. Let's break down the key components:</p>
    
    <ul>
      <li><strong>Scene</strong>: The container for all objects, cameras, and lights.</li>
      <li><strong>Camera</strong>: Defines what we see. The PerspectiveCamera mimics human vision.</li>
      <li><strong>Renderer</strong>: Renders the scene using WebGL.</li>
      <li><strong>Geometry</strong>: Defines the shape of an object.</li>
      <li><strong>Material</strong>: Defines the appearance of an object.</li>
      <li><strong>Mesh</strong>: Combines geometry and material to create a 3D object.</li>
      <li><strong>Light</strong>: Illuminates the scene.</li>
    </ul>
    
    <h2>Introduction to React Three Fiber</h2>
    <p>React Three Fiber is a React renderer for Three.js, allowing you to create 3D graphics using React's component-based approach. It simplifies the process of creating and managing Three.js scenes.</p>
    
    <pre><code>// Install React Three Fiber
npm install @react-three/fiber @react-three/drei

// Basic React Three Fiber component
import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box(props) {
  const meshRef = useRef();
  
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });
  
  return (
    <mesh {...props} ref={meshRef}>
      <boxGeometry />
      <meshStandardMaterial color={props.color || 'orange'} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 2]} intensity={1} />
      <Box position={[-1.5, 0, 0]} />
      <Box position={[1.5, 0, 0]} color="hotpink" />
      <OrbitControls />
    </Canvas>
  );
}</code></pre>
    
    <p>This React Three Fiber component creates two rotating boxes with orbit controls. The key advantages of using React Three Fiber include:</p>
    
    <ul>
      <li>Declarative syntax for creating 3D scenes</li>
      <li>Integration with React's component lifecycle and hooks</li>
      <li>Automatic disposal of Three.js objects when components unmount</li>
      <li>Easy integration with other React libraries and state management solutions</li>
    </ul>
    
    <h2>Creating Complex 3D Models</h2>
    <p>For complex 3D models, you'll typically use modeling software like Blender and export models in formats like glTF or GLB. React Three Fiber makes it easy to load and display these models:</p>
    
    <pre><code>import { useGLTF } from '@react-three/drei';

function Model({ url }) {
  const { scene } = useGLTF(url);
  return <primitive object={scene} />;
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 2]} intensity={1} />
      <Model url="/path/to/model.glb" />
      <OrbitControls />
    </Canvas>
  );
}</code></pre>
    
    <h2>Adding Interactivity</h2>
    <p>One of the advantages of 3D web development is the ability to create interactive experiences. React Three Fiber makes this straightforward:</p>
    
    <pre><code>import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function InteractiveBox(props) {
  const [hovered, setHovered] = useState(false);
  const [clicked, setClicked] = useState(false);
  
  return (
    <mesh
      {...props}
      onClick={() => setClicked(!clicked)}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      scale={clicked ? 1.5 : 1}
    >
      <boxGeometry />
      <meshStandardMaterial color={hovered ? 'hotpink' : 'orange'} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 2]} intensity={1} />
      <InteractiveBox position={[0, 0, 0]} />
      <OrbitControls />
    </Canvas>
  );
}</code></pre>
    
    <p>This code creates a box that changes color when hovered and scales up when clicked.</p>
    
    <h2>Physics and Animations</h2>
    <p>For more complex interactions, you can add physics using libraries like @react-three/cannon:</p>
    
    <pre><code>import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';

function Plane(props) {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], ...props }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[10, 10]} />
      <shadowMaterial color="#171717" transparent opacity={0.4} />
    </mesh>
  );
}

function Box(props) {
  const [ref] = useBox(() => ({ mass: 1, ...props }));
  return (
    <mesh ref={ref} castShadow>
      <boxGeometry />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function Scene() {
  return (
    <Canvas shadows>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 10, 5]} intensity={1} castShadow />
      <Physics>
        <Plane position={[0, -2, 0]} />
        <Box position={[0, 0, 0]} />
        <Box position={[0, 2, 0]} />
        <Box position={[0, 4, 0]} />
      </Physics>
      <OrbitControls />
    </Canvas>
  );
}</code></pre>
    
    <p>This code creates a scene with three boxes that fall onto a plane due to gravity.</p>
    
    <h2>Performance Optimization</h2>
    <p>3D graphics can be resource-intensive, so optimization is crucial for a smooth user experience. Here are some tips for optimizing your Three.js applications:</p>
    
    <ul>
      <li><strong>Use Instancing</strong>: For rendering many similar objects.</li>
      <li><strong>Implement Level of Detail (LOD)</strong>: Show less detailed models when they're far from the camera.</li>
      <li><strong>Optimize Textures</strong>: Use appropriate texture sizes and formats.</li>
      <li><strong>Use Object Pooling</strong>: Reuse objects instead of creating new ones.</li>
      <li><strong>Implement Frustum Culling</strong>: Only render objects that are visible to the camera.</li>
    </ul>
    
    <p>React Three Fiber provides tools for these optimizations, such as the useInstancedMesh hook for instancing.</p>
    
    <h2>Responsive 3D Design</h2>
    <p>Making your 3D applications responsive is important for a good user experience across devices:</p>
    
    <pre><code>import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import { useEffect, useState } from 'react';

function ResponsiveScene() {
  const [cameraPosition, setCameraPosition] = useState([0, 0, 5]);
  
  useEffect(() => {
    const handleResize = () => {
      // Adjust camera position based on screen size
      if (window.innerWidth < 768) {
        setCameraPosition([0, 0, 8]); // Move camera further back on small screens
      } else {
        setCameraPosition([0, 0, 5]);
      }
    };
    
    window.addEventListener('resize', handleResize);
    handleResize(); // Initial call
    
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  
  return (
    <Canvas>
      <PerspectiveCamera position={cameraPosition} makeDefault />
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 2]} intensity={1} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
}</code></pre>
    
    <p>This code adjusts the camera position based on the screen size, ensuring that the 3D content is appropriately framed on different devices.</p>
    
    <h2>Integrating with Next.js</h2>
    <p>Integrating Three.js with Next.js requires some special handling due to the server-side rendering nature of Next.js. Here's how to do it:</p>
    
    <pre><code>// components/Scene.js
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import dynamic from 'next/dynamic';

// Create a client-side only version of the component
const Scene = () => {
  return (
    <Canvas>
      <ambientLight intensity={0.5} />
      <directionalLight position={[0, 1, 2]} intensity={1} />
      <mesh>
        <boxGeometry />
        <meshStandardMaterial color="orange" />
      </mesh>
      <OrbitControls />
    </Canvas>
  );
};

// Export a dynamic component with SSR disabled
export default dynamic(() => Promise.resolve(Scene), { ssr: false });

// pages/index.js
import Scene from '../components/Scene';

export default function Home() {
  return (
    <div style={{ width: '100vw', height: '100vh' }}>
      <Scene />
    </div>
  );
}</code></pre>
    
    <p>The key is to use Next.js's dynamic import with SSR disabled to ensure that Three.js only runs on the client side.</p>
    
    <h2>Conclusion</h2>
    <p>3D web development with Three.js and React Three Fiber opens up exciting possibilities for creating immersive experiences on the web. By understanding the fundamentals and best practices outlined in this guide, you can start building your own 3D web applications.</p>
    
    <p>Remember that 3D development has a learning curve, but the results can be incredibly rewarding. Start with simple projects and gradually increase complexity as you become more comfortable with the concepts and tools.</p>
    
    <p>Happy coding, and enjoy bringing your 3D visions to life on the web!</p>
  `,
    coverImage: "/placeholder.svg?height=400&width=800",
    date: "September 15, 2023",
    readTime: "12 min read",
    author: "Anubhab Rakshit",
    authorImage: "/placeholder.svg?height=100&width=100",
    category: "Web Development",
    tags: ["Three.js", "React", "3D", "WebGL", "React Three Fiber"],
    slug: "3d-web-development-with-threejs",
  },
]

// Helper function to find a blog post by slug
export function getBlogPostBySlug(slug) {
  return blogPosts.find((post) => post.slug === slug) || null
}

// Helper function to get all blog posts
export function getAllBlogPosts() {
  return blogPosts
}

