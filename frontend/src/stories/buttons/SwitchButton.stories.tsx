import SwitchButton from "@/components/ui/shared/buttons/SwitchButton";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Buttons/SwitchButton",
  component: SwitchButton,
} satisfies Meta<typeof SwitchButton>;

type Story = StoryObj<typeof SwitchButton>;

export const Default: Story = {
  args: {},
};
