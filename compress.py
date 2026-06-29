import os
from PIL import Image

# Directory containing the images to compress
assets_dir = os.path.join(os.path.dirname(__file__), "src", "assets")

def compress_image(file_path):
    old_size = os.path.getsize(file_path)
    filename = os.path.basename(file_path)
    
    # We only want to compress files larger than 150KB
    if old_size < 150 * 1024:
        print(f"Skipping {filename} ({old_size / 1024:.1f} KB) - already small")
        return
        
    try:
        with Image.open(file_path) as img:
            width, height = img.size
            max_dim = 1200
            
            # Resize if the image is very large (e.g., camera/generated outputs)
            if width > max_dim or height > max_dim:
                if width > height:
                    new_width = max_dim
                    new_height = int(height * (max_dim / width))
                else:
                    new_height = max_dim
                    new_width = int(width * (max_dim / height))
                
                # Resize with high quality Lanczos filter
                img = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
                print(f"Resized {filename} from {width}x{height} to {new_width}x{new_height}")
            
            ext = os.path.splitext(file_path)[1].lower()
            
            if ext == '.png':
                # Convert to palette mode (indexed color) for massive PNG size reduction
                # This keeps the file as a valid PNG and preserves transparency (alpha)
                if img.mode in ('RGBA', 'LA') or (img.mode == 'P' and 'transparency' in img.info):
                    rgba = img.convert('RGBA')
                    quantized = rgba.quantize(colors=256, method=Image.Quantize.MAXCOVERAGE)
                    quantized.save(file_path, 'PNG', optimize=True)
                else:
                    rgb = img.convert('RGB')
                    quantized = rgb.quantize(colors=256, method=Image.Quantize.MAXCOVERAGE)
                    quantized.save(file_path, 'PNG', optimize=True)
            elif ext in ('.jpg', '.jpeg'):
                # Save JPEG with 80% quality and progressive/optimized rendering
                rgb = img.convert('RGB')
                rgb.save(file_path, 'JPEG', quality=80, optimize=True)
            else:
                print(f"Unsupported extension for {filename}: {ext}")
                return
                
        new_size = os.path.getsize(file_path)
        reduction = (old_size - new_size) / old_size * 100
        print(f"Compressed {filename}: {old_size / 1024 / 1024:.2f} MB -> {new_size / 1024:.1f} KB ({reduction:.1f}% reduction)")
    except Exception as e:
        print(f"Error compressing {filename}: {str(e)}")

def main():
    print(f"Scanning directory: {assets_dir}")
    if not os.path.exists(assets_dir):
        print("Error: src/assets directory not found.")
        return
        
    for file in os.listdir(assets_dir):
        file_path = os.path.join(assets_dir, file)
        if os.path.isfile(file_path):
            ext = os.path.splitext(file)[1].lower()
            if ext in ('.png', '.jpg', '.jpeg'):
                compress_image(file_path)
    print("All operations complete.")

if __name__ == "__main__":
    main()
