import LoadingSmall from "@/components/ui/shared/loading/LoadingSmall";
import type { StoryObj, Meta } from "@storybook/nextjs-vite";

export default {
  title: "UI/Loading/LoadingSmall",
  component: LoadingSmall,
} satisfies Meta<typeof LoadingSmall>;

type Story = StoryObj<typeof LoadingSmall>;

export const Default: Story = {
  args: {},
};
