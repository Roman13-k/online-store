import CopyButton from "@/components/ui/shared/buttons/CopyButton";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Buttons/CopyButton",
  component: CopyButton,
} satisfies Meta<typeof CopyButton>;

type Story = StoryObj<typeof CopyButton>;

export const Default: Story = {
  args: {
    className: "",
    textToCopy: "",
  },
};
