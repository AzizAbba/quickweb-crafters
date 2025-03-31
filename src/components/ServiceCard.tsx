
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

interface ServiceCardProps {
  title: string;
  description: string;
  features: string[];
  price?: string;
  deliveryTime?: string;
  ctaText?: string;
  ctaLink?: string;
  type?: "basic" | "standard" | "advanced" | "ecommerce";
}

const ServiceCard = ({
  title,
  description,
  features,
  price,
  deliveryTime,
  ctaText = "Learn More",
  ctaLink = "/contact",
  type = "basic",
}: ServiceCardProps) => {
  const getCardStyle = () => {
    switch (type) {
      case "standard":
        return "border-blue-300";
      case "advanced":
        return "border-blue-500";
      case "ecommerce":
        return "border-brand-blue";
      default:
        return "border-gray-200";
    }
  };

  return (
    <Card className={`card-hover ${getCardStyle()}`}>
      <CardHeader>
        <CardTitle className="text-xl font-bold">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start">
              <svg
                className="h-5 w-5 text-green-500 mr-2 mt-0.5 flex-shrink-0"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              <span className="text-sm text-gray-600">{feature}</span>
            </li>
          ))}
        </ul>
        {price && deliveryTime && (
          <div className="mt-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Price:</span>
              <span className="text-lg font-bold text-brand-blue">{price}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">Delivery Time:</span>
              <span className="text-sm font-medium">{deliveryTime}</span>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <Link to={ctaLink} className="w-full">
          <Button className="w-full">{ctaText}</Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default ServiceCard;
