import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { File } from 'lucide-react';
import { cn } from '@/lib/utils';

type DocumentUploadCardProps = {
  title: string;
  description?: string;
  fileTypes: string[];
  onFileUploaded: (file: File) => void;
  className?: string;
};

const DocumentUploadCard: React.FC<DocumentUploadCardProps> = ({
  title,
  description,
  fileTypes,
  onFileUploaded,
  className,
}) => {
  const [fileName, setFileName] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0];
    if (file) {
      setFileName(file.name);
      onFileUploaded(file);
    } else {
      setFileName(null);
    }
  };

  const handleUploadButtonClick = () => {
    fileInputRef.current && (fileInputRef.current as HTMLInputElement).click();
  };

  return (
    <div className={cn("rounded-lg border bg-card text-card-foreground shadow-sm w-full", className)}>
      <div className="flex flex-col space-y-1.5 p-6">
        <h3 className="text-xl font-semibold">{title}</h3>
        {description && <p className="text-sm text-muted-foreground">{description}</p>}
      </div>
      <div className="p-6">
        <div className="grid gap-4">
          <div className="flex items-center space-x-2">
            <Label htmlFor="upload" className="text-right">
              {fileName ? fileName : `Upload ${fileTypes.join(', ')} File`}
            </Label>
            <Button variant="outline" size="sm" onClick={handleUploadButtonClick}>
              <File className="mr-2 h-4 w-4" />
              Choose File
            </Button>
          </div>
          <Input
            id="upload"
            type="file"
            accept={fileTypes.map(type => `.${type}`).join(', ')} // Accepts multiple types
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentUploadCard;
