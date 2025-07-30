import Checkbox from "@/components/ui/shared/checkboxes/Checkbox";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Checkboxes/Checkbox",
  component: Checkbox,
} satisfies Meta<typeof Checkbox>;

type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {
  args: {
    data: "",
  },
};
