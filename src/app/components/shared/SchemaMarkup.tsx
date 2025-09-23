import { Organization, WithContext } from "schema-dts";

interface SchemaMarkupProps {
  type: "Organization" | "WebSite" | "WebPage";
  data: any;
}

const SchemaMarkup = ({ type, data }: SchemaMarkupProps) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
    />
  );
};

export default SchemaMarkup; 