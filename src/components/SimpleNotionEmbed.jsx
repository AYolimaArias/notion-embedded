import "./SimpleNotionEmbed.css";

const SimpleNotionEmbed = () => {
  return (
    <div className="simple-notion-container">
      <iframe
        src="https://v2-embednotion.com/1dc46e14a97d80d585affc7123901d7b"
        className="notion-iframe"
        title="Notion Content"
        loading="lazy"
      />
    </div>
  );
};

export default SimpleNotionEmbed;
