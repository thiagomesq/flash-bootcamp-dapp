import { Card, CardContent, CardHeader } from '@/components/ui/card';

interface StatusCardProps {
  title: string;
  value: string | number;
  isLoading?: boolean;
}

export function StatusCard({ title, value, isLoading }: StatusCardProps) {
  return (
    <Card>
      <CardHeader>
        <h1>{title}</h1>
      </CardHeader>
      <CardContent>
        {
          isLoading ? (
            <div className="animate-pulse h-3 bg-gray-200 rounded" />
          ) : <h2 className="font-bold">{value.toString()}</h2>
        }
      </CardContent>
    </Card>
  );
}