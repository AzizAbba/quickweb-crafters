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
  imageUrl?: string;
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
  price?: string;
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

export interface TeamMemberType {
  name: string;
  role: string;
  bio: string;
  image: string;
}

interface AboutContent {
  story: string;
  mission: string;
  team: TeamMemberType[];
  teamImage?: string;
}

interface SiteContent {
  heroTitle: string;
  heroSubtitle: string;
  aboutContent: string;
  heroImage?: string;
  pricingTitle?: string;
  pricingSubtitle?: string;
  pricingDescription?: string;
  contactTitle?: string;
  contactSubtitle?: string;
  contactEmail?: string;
  contactPhone?: string;
  contactAddress?: string;
}

export interface FooterLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
}

export interface LegalContent {
  privacyPolicy?: string;
  termsOfService?: string;
}

interface DataContextType {
  services: ServiceType[];
  testimonials: TestimonialType[];
  orders: OrderType[];
  messages: MessageType[];
  users: UserWithPassword[];
  siteContent: SiteContent;
  aboutContent: AboutContent;
  footerLinks: FooterLinks;
  legalContent: LegalContent;
  updateSiteContent: (newContent: Partial<SiteContent>) => void;
  updateAboutContent: (newContent: Partial<AboutContent>) => void;
  updateFooterLinks: (links: FooterLinks) => void;
  updateLegalContent: (content: LegalContent) => void;
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
    price: "$499",
    deliveryTime: "3 days",
    type: "basic",
    imageUrl: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    price: "$899",
    deliveryTime: "4 days",
    type: "standard",
    imageUrl: "https://images.unsplash.com/photo-1522542550221-31fd19575a2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    price: "$1,499",
    deliveryTime: "5 days",
    type: "advanced",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
    price: "$2,499",
    deliveryTime: "7-10 days",
    type: "ecommerce",
    imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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

const defaultAboutContent: AboutContent = {
  story: "QuickWeb Creations was founded with a simple mission: to provide affordable, high-quality websites for businesses of all sizes. Our team of experienced developers and designers work together to create beautiful, functional websites that help our clients succeed online.",
  mission: "Our mission is to empower businesses with beautiful, functional, and affordable websites. We believe that every business deserves a great online presence, regardless of size or budget.",
  team: [
    {
      name: "Sarah Johnson",
      role: "Founder & CEO",
      bio: "With over 10 years of experience in web development and design, Sarah leads our team with passion and expertise.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Michael Lee",
      role: "Lead Developer",
      bio: "Michael specializes in front-end development and has a keen eye for creating responsive, user-friendly websites.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "Emma Rodriguez",
      role: "UX Designer",
      bio: "Emma combines creative design with user experience expertise to create websites that are both beautiful and functional.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    },
    {
      name: "David Chen",
      role: "Project Manager",
      bio: "David ensures all projects are delivered on time and to the highest standard, with excellent communication throughout.",
      image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&auto=format&fit=crop&w=256&q=80"
    }
  ]
};

const defaultFooterLinks: FooterLinks = {
  facebook: "https://facebook.com",
  instagram: "https://instagram.com",
  twitter: "https://twitter.com",
  linkedin: "https://linkedin.com"
};

const defaultLegalContent: LegalContent = {
  privacyPolicy: "",
  termsOfService: ""
};

export const DataContext = createContext<DataContextType>({
  services: defaultServices,
  testimonials: defaultTestimonials,
  orders: defaultOrders,
  messages: defaultMessages,
  users: [],
  siteContent: defaultSiteContent,
  aboutContent: defaultAboutContent,
  footerLinks: defaultFooterLinks,
  legalContent: defaultLegalContent,
  updateSiteContent: () => {},
  updateAboutContent: () => {},
  updateFooterLinks: () => {},
  updateLegalContent: () => {},
  addOrder: () => {},
  updateOrderStatus: () => {},
  addMessage: () => {},
  markMessageAsRead: () => {},
  updateService: () => {},
  updateUserStatus: () => {},
});

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [services, setServices] = useState<ServiceType[]>(defaultServices);
  const [testimonials, setTestimonials] = useState<TestimonialType[]>(defaultTestimonials);
  const [orders, setOrders] = useState<OrderType[]>(defaultOrders);
  const [messages, setMessages] = useState<MessageType[]>(defaultMessages);
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);
  const [aboutContent, setAboutContent] = useState<AboutContent>(defaultAboutContent);
  const [footerLinks, setFooterLinks] = useState<FooterLinks>(defaultFooterLinks);
  const [legalContent, setLegalContent] = useState<LegalContent>(defaultLegalContent);
  const [users, setUsers] = useState<UserWithPassword[]>([]);

  useEffect(() => {
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
    const storedAboutContent = localStorage.getItem("quickweb_about_content");
    const storedFooterLinks = localStorage.getItem("quickweb_footer_links");
    const storedLegalContent = localStorage.getItem("quickweb_legal_content");

    if (storedServices) setServices(JSON.parse(storedServices));
    if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    if (storedMessages) setMessages(JSON.parse(storedMessages));
    if (storedSiteContent) setSiteContent(JSON.parse(storedSiteContent));
    if (storedAboutContent) setAboutContent(JSON.parse(storedAboutContent));
    if (storedFooterLinks) setFooterLinks(JSON.parse(storedFooterLinks));
    if (storedLegalContent) setLegalContent(JSON.parse(storedLegalContent));
  }, []);

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

  useEffect(() => {
    localStorage.setItem("quickweb_services", JSON.stringify(services));
    localStorage.setItem("quickweb_testimonials", JSON.stringify(testimonials));
    localStorage.setItem("quickweb_orders", JSON.stringify(orders));
    localStorage.setItem("quickweb_messages", JSON.stringify(messages));
    localStorage.setItem("quickweb_site_content", JSON.stringify(siteContent));
    localStorage.setItem("quickweb_about_content", JSON.stringify(aboutContent));
    localStorage.setItem("quickweb_footer_links", JSON.stringify(footerLinks));
    localStorage.setItem("quickweb_legal_content", JSON.stringify(legalContent));
  }, [services, testimonials, orders, messages, siteContent, aboutContent, footerLinks, legalContent]);

  const updateSiteContent = (newContent: Partial<SiteContent>) => {
    setSiteContent((prev) => ({ ...prev, ...newContent }));
  };

  const updateAboutContent = (newContent: Partial<AboutContent>) => {
    setAboutContent((prev) => ({ ...prev, ...newContent }));
  };

  const updateFooterLinks = (links: FooterLinks) => {
    setFooterLinks(links);
  };

  const updateLegalContent = (content: LegalContent) => {
    setLegalContent(content);
  };

  const addOrder = (order: Omit<OrderType, "id" | "createdAt">) => {
    const newOrder: OrderType = {
      ...order,
      id: `order-${Date.now()}`,
      createdAt: new Date().toISOString(),
    };
    setOrders((prev) => [...prev, newOrder]);
    return Promise.resolve(newOrder);
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
    setUsers((prev) =>
      prev.map((user) =>
        user.id === id ? { ...user, active } : user
      )
    );
    
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

  const contextValue: DataContextType = {
    services,
    testimonials,
    orders,
    messages,
    users,
    siteContent,
    aboutContent,
    footerLinks,
    legalContent,
    updateSiteContent,
    updateAboutContent,
    updateFooterLinks,
    updateLegalContent,
    addOrder,
    updateOrderStatus,
    addMessage,
    markMessageAsRead,
    updateService,
    updateUserStatus,
  };

  return (
    <DataContext.Provider value={contextValue}>
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
