import urllib.request
import csv
import os

def download_and_prepare_dataset():
    url = 'https://raw.githubusercontent.com/lutzhamel/fake-news/master/data/fake_or_real_news.csv'
    base_dir = os.path.dirname(os.path.abspath(__file__))
    temp_file = os.path.join(base_dir, 'fake_or_real_news.csv')
    output_file = os.path.join(base_dir, 'train.csv')
    
    print("Downloading authentic dataset (~30MB). This may take a minute...")
    urllib.request.urlretrieve(url, temp_file)
    print("Download complete. Processing dataset...")

    # The downloaded dataset has columns: Unnamed: 0, title, text, label (FAKE/REAL)
    # We want: text, label (0/1)
    with open(temp_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8', newline='') as outfile:
        reader = csv.reader(infile)
        writer = csv.writer(outfile)
        
        headers = next(reader)
        # Find indices
        title_idx = headers.index('title')
        text_idx = headers.index('text')
        label_idx = headers.index('label')
        
        # Write our new headers
        writer.writerow(['text', 'label'])
        
        for row in reader:
            if len(row) > max(title_idx, text_idx, label_idx):
                title = row[title_idx]
                text = row[text_idx]
                combined_text = title + " " + text
                label_str = row[label_idx].strip().upper()
                label = 0 if label_str == 'FAKE' else 1
                writer.writerow([combined_text, label])
                
    # Clean up temp file
    if os.path.exists(temp_file):
        os.remove(temp_file)
        
    print(f"Dataset successfully prepared and saved to {output_file}")
    print("You can now run 'python ml/train_model.py' to train on this real data!")

if __name__ == "__main__":
    download_and_prepare_dataset()
