'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import DocumentUploadCard from '@/components/kyc/DocumentUploadCard';
import { useSelector } from 'react-redux';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';
import { CheckCircle } from 'lucide-react';

export default function KycUpload() {
  const [panFile, setPanFile] = useState<File | null>(null);
  const [aadhaarFile, setAadhaarFile] = useState<File | null>(null);
  const [panNo, setPanNo] = useState('');
  const [aadhaarNo, setAadhaarNo] = useState('');
  const [loading, setLoading] = useState(false);

  const [kycStatus, setKycStatus] = useState<any>(null);
  const [kycFetched, setKycFetched] = useState(false);

  const { user } = useSelector((state: any) => state.user) || {};

  useEffect(() => {
    const fetchKycStatus = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/api/kyc/status/${user.id}`);
        setKycStatus(response.data);
      } catch (err) {
        console.log('No KYC record found.');
      } finally {
        setKycFetched(true);
      }
    };

    if (user?.id) {
      fetchKycStatus();
    }
  }, [user?.id]);

  const handleFileUpload = async () => {
    if (!panFile || !aadhaarFile || !panNo || !aadhaarNo) {
      alert('Please fill all fields and upload files');
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append('userId', user.id);
    formData.append('panNo', panNo);
    formData.append('aadhaarNo', aadhaarNo);
    formData.append('panFile', panFile);
    formData.append('aadhaarFile', aadhaarFile);

    try {
      const response = await axios.post('http://localhost:8080/api/kyc/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast({
        title: 'KYC Documents Uploaded',
        description: 'Your KYC documents have been uploaded successfully.',
        variant: 'default',
      });

      const updatedStatus = await axios.get(`http://localhost:8080/api/kyc/status/${user.id}`);
      setKycStatus(updatedStatus.data);
    } catch (error: any) {
      console.error('Error uploading KYC:', error);
      toast({
        title: 'Error Uploading KYC',
        description: error.response?.data || 'Something went wrong',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const renderPreview = (file: File | null) => {
    if (!file) return null;

    const url = URL.createObjectURL(file);
    const fileType = file.type;

    if (fileType.includes('pdf')) {
      return (
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-blue-600 underline"
        >
          Preview PDF
        </a>
      );
    }

    return <img src={url} alt="Preview" className="mt-2 w-48 rounded shadow" />;
  };

  const isVerified = kycStatus?.status === 'VERIFIED';
  const isPending = kycStatus?.status === 'PENDING';

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">KYC Documents</h1>
        <p className="text-muted-foreground">Upload and manage your KYC documents</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <DocumentUploadCard
            title="PAN Card"
            description="Upload your PAN card for identity verification"
            fileTypes={["pdf", "jpg", "jpeg", "png"]}
            onFileUploaded={(file) => setPanFile(file)}
          />
          <Input
            type="text"
            placeholder="Enter your PAN number"
            value={panNo}
            onChange={(e) => setPanNo(e.target.value)}
            className="mt-4"
            disabled={isVerified}
          />
          {renderPreview(panFile)}
        </div>

        <div>
          <DocumentUploadCard
            title="Aadhaar Card"
            description="Upload your Aadhaar card for address verification"
            fileTypes={["pdf", "jpg", "jpeg", "png"]}
            onFileUploaded={(file) => setAadhaarFile(file)}
          />
          <Input
            type="text"
            placeholder="Enter your Aadhaar number"
            value={aadhaarNo}
            onChange={(e) => setAadhaarNo(e.target.value)}
            className="mt-4"
            disabled={isVerified}
          />
          {renderPreview(aadhaarFile)}
        </div>
      </div>

      <div className="mt-6">
        <Button
          onClick={handleFileUpload}
          disabled={loading || isPending || isVerified}
        >
          {loading
            ? 'Uploading...'
            : isPending
              ? 'KYC Under Review'
              : isVerified
                ? 'KYC Verified'
                : 'Upload Documents'}
        </Button>
      </div>

      {kycFetched && kycStatus && (
        <div
          className={`mt-6 p-4 rounded-lg ${isVerified ? 'bg-green-50 border border-green-200' : 'bg-muted'
            }`}
        >
          <div className="flex items-center gap-2">
            {isVerified && <CheckCircle className="text-green-600" />}
            <h2 className="text-lg font-semibold">
              Current KYC Status:{' '}
              <span
                className={
                  isVerified ? 'text-green-700' : isPending ? 'text-yellow-600' : 'text-primary'
                }
              >
                {kycStatus.status}
              </span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
            <div>
              <p className="text-sm font-medium mb-1">PAN Card:</p>
              <a
                href={kycStatus.panUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View PAN Document
              </a>
            </div>
            <div>
              <p className="text-sm font-medium mb-1">Aadhaar Card:</p>
              <a
                href={kycStatus.aadhaarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Aadhaar Document
              </a>
            </div>
          </div>
        </div>
      )}

      <div className="text-sm text-muted-foreground bg-muted p-4 rounded-lg mt-4">
        <p>
          Note: All documents should be clearly visible and must match the details provided
          in your application. Processing may take 1–2 business days.
        </p>
      </div>
    </div>
  );
}
