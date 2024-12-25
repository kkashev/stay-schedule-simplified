import { useState } from "react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

export function ImageUpload() {
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const uploadImage = async (event: React.ChangeEvent<HTMLInputElement>) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${Math.random()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from('images')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      const { data } = supabase.storage
        .from('images')
        .getPublicUrl(filePath);

      toast({
        title: "Успешно качване",
        description: "Изображението беше качено успешно. URL: " + data.publicUrl,
      });
      
    } catch (error: any) {
      toast({
        title: "Грешка",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Button
          onClick={() => document.getElementById('single')?.click()}
          disabled={uploading}
          variant="outline"
        >
          {uploading ? 'Качване...' : 'Качи изображение'}
        </Button>
      </div>
      <input
        type="file"
        id="single"
        accept="image/*"
        onChange={uploadImage}
        disabled={uploading}
        style={{ display: 'none' }}
      />
    </div>
  );
}