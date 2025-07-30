import { Loading } from "@/components/ui/shared/loading/Loading";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Loading/Loading",
  component: Loading,
} satisfies Meta<typeof Loading>;

type Story = StoryObj<typeof Loading>;

export const Default: Story = {
  args: {},
};
