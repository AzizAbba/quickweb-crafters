
import { Card, CardContent } from "@/components/ui/card";

interface TestimonialCardProps {
  name: string;
  role: string;
  content: string;
  image?: string;
}

const TestimonialCard = ({ name, role, content, image }: TestimonialCardProps) => {
  return (
    <Card className="card-hover">
      <CardContent className="pt-6">
        <div className="flex items-center mb-4">
          <div className="h-12 w-12 rounded-full bg-gray-200 overflow-hidden flex items-center justify-center mr-4">
            {image ? (
              <img src={image} alt={name} className="h-full w-full object-cover" />
            ) : (
              <svg
                className="h-6 w-6 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                ></path>
              </svg>
            )}
          </div>
          <div>
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <p className="text-sm text-gray-500">{role}</p>
          </div>
        </div>
        <div className="mb-4">
          <svg
            className="h-5 w-5 text-gray-400 mb-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <p className="text-gray-700">{content}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
