import AboutScreen from "@/components/screens/AboutScreen";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "Pages/AboutPage",
  component: AboutScreen,
} satisfies Meta<typeof AboutScreen>;

type Story = StoryObj<typeof AboutScreen>;

export const Default: Story = {
  args: {},
};
