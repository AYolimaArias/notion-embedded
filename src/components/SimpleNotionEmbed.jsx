import "./SimpleNotionEmbed.css";

const SimpleNotionEmbed = () => {
  return (
    <div className="simple-notion-container">
      <iframe
        src="https://v2-embednotion.com/28be9e2e2a388084842ff409d5ee27fd"
        className="notion-iframe"
        title="Notion Content"
        loading="lazy"
      />
    </div>
  );
};

export default SimpleNotionEmbed;
