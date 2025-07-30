import FaqScreen from "@/components/screens/FaqScreen";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "Pages/FaqPage",
  component: FaqScreen,
} satisfies Meta<typeof FaqScreen>;

type Story = StoryObj<typeof FaqScreen>;

export const Default: Story = {
  args: {},
};
