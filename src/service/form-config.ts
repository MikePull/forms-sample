import { IFormConfig } from "./user-schema";

export const loadFormConfig: IFormConfig = {
  questions: [
    {
      title: "Tell us about yourself",
      fields: [
        { name: "first_name", label: "First Name", type: "text" },
        { name: "last_name", label: "Last Name", type: "text" },
        { name: "primary_email", label: "Primary Email", type: "text" },
        { name: "secondary_email", label: "Secondary Email", type: "text" },
        { name: "phone_number", label: "Phone Number", type: "text" }
      ]
    },
    {
      title: "Where do you live?",
      fields: [
        { name: "street_address", label: "Street Address", type: "text" },
        { name: "post_code", label: "Post Code", type: "text" },
        {
          name: "country",
          label: "Country",
          type: "dropdown",
          options: ["Canada", "USA"]
        },
        {
          name: "region",
          label: "Region",
          type: "dropdown",
          options: ["North", "West", "East", "South"]
        }
      ]
    }
  ]
};
