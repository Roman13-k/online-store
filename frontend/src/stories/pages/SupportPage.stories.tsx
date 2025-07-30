import SupportScreen from "@/components/screens/SupportScreen";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "Pages/SupportPage",
  component: SupportScreen,
} satisfies Meta<typeof SupportScreen>;

type Story = StoryObj<typeof SupportScreen>;

export const Default: Story = {
  args: {},
};
