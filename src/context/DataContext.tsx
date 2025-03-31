import React, { createContext, useContext, useState, useEffect } from "react";
import type { UserWithPassword } from "@/types/auth";

export interface ServiceType {
  id: string;
  title: string;
  description: string;
  features: string[];
  price: string;
  deliveryTime: string;
  type: "basic" | "standard" | "advanced" | "ecommerce";
}

export interface TestimonialType {
  id: string;
  name: string;
  role: string;
  content: string;
  image?: string;
}

export interface OrderType {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  serviceType: string;
  status: "pending" | "in-progress" | "completed" | "cancelled";
  createdAt: string;
  details: string;
  businessType?: string;
  requirements?: string;
}

export interface MessageType {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  createdAt: string;
  isRead: boolean;
}

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutContent: string;
}

interface DataContextType {
  services: ServiceType[];
  testimonials: TestimonialType[];
  orders: OrderType[];
  messages: MessageType[];
  users: UserWithPassword[];
  siteContent: SiteContent;
  updateSiteContent: (newContent: Partial<SiteContent>) => void;
  addOrder: (order: Omit<OrderType, "id" | "createdAt">) => void;
  updateOrderStatus: (id: string, status: OrderType["status"]) => void;
  addMessage: (message: Omit<MessageType, "id" | "createdAt" | "isRead">) => void;
  markMessageAsRead: (id: string) => void;
  updateService: (service: ServiceType) => void;
  updateUserStatus: (id: string, active: boolean) => void;
}

const defaultServices: ServiceType[] = [
  {
    id: "service-1",
    title: "Basic Website",
    description: "Simple static website for small businesses and individuals",
    features: [
      "Responsive Design",
      "Up to 5 Pages",
      "Contact Form",
      "Basic SEO",
      "Mobile Friendly",
    ],
    price: "$10",
    deliveryTime: "3 days",
    type: "basic",
  },
  {
    id: "service-2",
    title: "Standard Website",
    description: "Interactive design with advanced UI elements",
    features: [
      "Everything in Basic",
      "Up to 10 Pages",
      "Custom Animations",
      "Advanced SEO",
      "Social Media Integration",
    ],
    price: "$18",
    deliveryTime: "4 days",
    type: "standard",
  },
  {
    id: "service-3",
    title: "Advanced Website",
    description: "Fully customized website with premium features",
    features: [
      "Everything in Standard",
      "Unlimited Pages",
      "Advanced Animations",
      "Premium SEO Package",
      "Google Analytics Integration",
      "Maintenance Support",
    ],
    price: "$25",
    deliveryTime: "5 days",
    type: "advanced",
  },
  {
    id: "service-4",
    title: "E-Commerce Store",
    description: "Professional online store for your products",
    features: [
      "Product Listings",
      "Shopping Cart",
      "Payment Integration",
      "Order Management",
      "Customer Accounts",
      "Inventory Management",
    ],
    price: "$79",
    deliveryTime: "7-10 days",
    type: "ecommerce",
  },
];

const defaultTestimonials: TestimonialType[] = [
  {
    id: "testimonial-1",
    name: "Sarah Johnson",
    role: "Small Business Owner",
    content: "QuickWeb Creations transformed my business online presence. Their attention to detail and quick delivery exceeded my expectations!",
  },
  {
    id: "testimonial-2",
    name: "Michael Chang",
    role: "Photographer",
    content: "My portfolio website looks amazing! The team was professional, responsive, and delivered exactly what I needed for my photography business.",
  },
  {
    id: "testimonial-3",
    name: "Elena Rodriguez",
    role: "E-commerce Entrepreneur",
    content: "The online store they built for me is both beautiful and functional. Sales have increased by 40% since the launch!",
  },
];

const defaultOrders: OrderType[] = [
  {
    id: "order-1",
    userId: "user-1",
    userName: "John Smith",
    userEmail: "john@example.com",
    serviceType: "Basic Website",
    status: "completed",
    createdAt: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000).toISOString(),
    details: "Business website for a local plumber",
    businessType: "Small Business",
    requirements: "Need to showcase services, pricing, and contact information",
  },
  {
    id: "order-2",
    userId: "user-2",
    userName: "Emily Jones",
    userEmail: "emily@example.com",
    serviceType: "Standard Website",
    status: "in-progress",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    details: "Portfolio website with gallery integration",
    businessType: "Personal Portfolio",
    requirements: "Need to showcase my photography work with a modern design",
  },
  {
    id: "order-3",
    userId: "user-3",
    userName: "Robert Lee",
    userEmail: "robert@example.com",
    serviceType: "E-Commerce Store",
    status: "pending",
    createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    details: "Online store for handmade crafts with 50+ products",
    businessType: "Small Business",
    requirements: "Need product categories, shopping cart, and payment integration",
  },
];

const defaultMessages: MessageType[] = [
  {
    id: "message-1",
    name: "Sarah Johnson",
    email: "sarah@example.com",
    subject: "Question about pricing",
    message: "Hi, I'm interested in your services but have some questions about pricing for my specific needs. Could you provide some more details? Thanks!",
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    isRead: true,
  },
  {
    id: "message-2",
    name: "Michael Brown",
    email: "michael@example.com",
    subject: "Website maintenance inquiry",
    message: "Hello, I have an existing website that needs some updates and maintenance. Do you offer this kind of service? If yes, what are your rates?\n\nBest regards,\nMichael",
    createdAt: new Date(Date.now() - 18 * 60 * 60 * 1000).toISOString(),
    isRead: false,
  }
];

const defaultSiteContent: SiteContent = {
  heroTitle: "Professional Websites, Delivered Fast",
  heroSubtitle: "We design modern, responsive, and SEO-optimized websites for businesses, individuals, and entrepreneurs.",
  aboutContent: "QuickWeb Creations is a professional web development service that helps businesses, individuals, and entrepreneurs establish a strong online presence. We design modern, responsive, and SEO-optimized websites with clean, high-quality code."
};

const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceType[]>(defaultServices);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>(defaultTestimonials);
  const [orders, setOrders] = useState<OrderType[]>(defaultOrders);
  const [messages, setMessages] = useState<MessageType[]>(defaultMessages);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [users, setUsers] = useState<UserWithPassword[]>([]);

  // Load data from local storage on initial render
  useEffect(() => {
    // Load users from localStorage (managed by AuthContext)
    const storedUsers = localStorage.getItem("quickweb_users");
    if (storedUsers) {
      try {
        setUsers(JSON.parse(storedUsers));
      } catch (error) {
        console.error("Failed to parse stored users", error);
      }
    }
    
    const storedServices = localStorage.getItem("quickweb_services");
    const storedTestimonials = localStorage.getItem("quickweb_testimonials");
    const storedOrders = localStorage.getItem("quickweb_orders");
    const storedMessages = localStorage.getItem("quickweb_messages");
    const storedSiteContent = localStorage.getItem("quickweb_site_content");

    if (storedServices) setServices(JSON.parse(storedServices));
    if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    if (storedMessages) setMessages(JSON.parse(storedMessages));
    if (storedSiteContent) setSiteContent(JSON.parse(storedSiteContent));
  }, []);

  // Load users from localStorage whenever it changes
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "quickweb_users" && e.newValue) {
        try {
          setUsers(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Failed to parse updated users", error);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);
    
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  // Save data to local storage when it changes
  useEffect(() => {
    localStorage.setItem("quickweb_services", JSON.stringify(services));
    localStorage.setItem("quickweb_testimonials", JSON.stringify(testimonials));
    localStorage.setItem("quickweb_orders", JSON.stringify(orders));
    localStorage.setItem("quickweb_messages", JSON.stringify(messages));
    localStorage.setItem("quickweb_site_content", JSON.stringify(siteContent));
  }, [services, testimonials, orders, messages, siteContent]);

  const updateSiteContent = (newContent: Partial<SiteContent>) => {
    setSiteContent((prev) => ({ ...prev, ...newContent }));
  };

  const addOrder = (order: Omit<OrderType, "id" | "createdAt">) => {
    const newOrder: OrderType = {
      ...order,
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, newOrder]);
  };

  const updateOrderStatus = (id: string, status: OrderType["status"]) => {
    setOrders((prev) =>
      prev.map((order) =>
        order.id === id ? { ...order, status } : order
      )
    );
  };

  const addMessage = (message: Omit<MessageType, "id" | "createdAt" | "isRead">) => {
    const newMessage: MessageType = {
      ...message,
      id: `message-${Date.now()}`,
      createdAt: new Date().toISOString(),
      isRead: false,
    };
    setMessages((prev) => [...prev, newMessage]);
  };

  const markMessageAsRead = (id: string) => {
    setMessages((prev) =>
      prev.map((message) =>
        message.id === id ? { ...message, isRead: true } : message
      )
    );
  };

  const updateService = (updatedService: ServiceType) => {
    setServices((prev) =>
      prev.map((service) =>
        service.id === updatedService.id ? updatedService : service
      )
    );
  };

  const updateUserStatus = (id: string, active: boolean) => {
    // Update users in DataContext
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active } : user
      )
    );
    
    // Also update the localStorage directly to keep AuthContext in sync
    const storedUsers = localStorage.getItem("quickweb_users");
    if (storedUsers) {
      try {
        const parsedUsers = JSON.parse(storedUsers);
        const updatedUsers = parsedUsers.map((user: UserWithPassword) => 
          user.id === id ? { ...user, active } : user
        );
        localStorage.setItem("quickweb_users", JSON.stringify(updatedUsers));
      } catch (error) {
        console.error("Failed to update user status in localStorage", error);
      }
    }
  };

  return (
    <DataContext.Provider
      value={{
        services,
        testimonials,
        orders,
        messages,
        users,
        siteContent,
        updateSiteContent,
        addOrder,
        updateOrderStatus,
        addMessage,
        markMessageAsRead,
        updateService,
        updateUserStatus,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error("useData must be used within a DataProvider");
  }
  return context;
};
