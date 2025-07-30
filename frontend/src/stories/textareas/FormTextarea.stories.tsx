import FormTextarea from "@/components/ui/shared/textareas/FormTextarea";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Textareas/FormTextarea",
  component: FormTextarea,
} satisfies Meta<typeof FormTextarea>;

type Story = StoryObj<typeof FormTextarea>;

export const Default: Story = {
  args: {
    className: "",
    label: "",
  },
};
