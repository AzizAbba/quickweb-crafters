
import React, { createContext, useContext, useState, useEffect } from "react";

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
  siteContent: SiteContent;
  updateSiteContent: (newContent: Partial<SiteContent>) => void;
  addOrder: (order: Omit<OrderType, "id" | "createdAt">) => void;
  updateOrderStatus: (id: string, status: OrderType["status"]) => void;
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
  },
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
  const [siteContent, setSiteContent] = useState<SiteContent>(defaultSiteContent);

  // Load data from local storage on initial render
  useEffect(() => {
    const storedServices = localStorage.getItem("quickweb_services");
    const storedTestimonials = localStorage.getItem("quickweb_testimonials");
    const storedOrders = localStorage.getItem("quickweb_orders");
    const storedSiteContent = localStorage.getItem("quickweb_site_content");

    if (storedServices) setServices(JSON.parse(storedServices));
    if (storedTestimonials) setTestimonials(JSON.parse(storedTestimonials));
    if (storedOrders) setOrders(JSON.parse(storedOrders));
    if (storedSiteContent) setSiteContent(JSON.parse(storedSiteContent));
  }, []);

  // Save data to local storage when it changes
  useEffect(() => {
    localStorage.setItem("quickweb_services", JSON.stringify(services));
    localStorage.setItem("quickweb_testimonials", JSON.stringify(testimonials));
    localStorage.setItem("quickweb_orders", JSON.stringify(orders));
    localStorage.setItem("quickweb_site_content", JSON.stringify(siteContent));
  }, [services, testimonials, orders, siteContent]);

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

  return (
    <DataContext.Provider
      value={{
        services,
        testimonials,
        orders,
        siteContent,
        updateSiteContent,
        addOrder,
        updateOrderStatus,
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
