import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./card";

export default function LoginCard() {
  return (
    <div className="w-[550px] ">
      <Card className="bg-primary/50 border-none text-secondary">
        <CardHeader>
          <CardTitle>Card Title</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </div>
  );
}
