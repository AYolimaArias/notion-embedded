import "./SimpleNotionEmbed.css";

const SimpleNotionEmbed = () => {
  return (
    <div className="simple-notion-container">
      <iframe
        src="https://v2-embednotion.com/28ce9e2e2a38818a8300e190a6147cb4"
        className="notion-iframe"
        title="Notion Content"
        loading="lazy"
      />
    </div>
  );
};

export default SimpleNotionEmbed;
