import FormInput from "@/components/ui/shared/inputs/FormInput";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Inputs/FormInput",
  component: FormInput,
} satisfies Meta<typeof FormInput>;

type Story = StoryObj<typeof FormInput>;

export const Default: Story = {
  args: {
    className: "",
    label: "",
  },
};
