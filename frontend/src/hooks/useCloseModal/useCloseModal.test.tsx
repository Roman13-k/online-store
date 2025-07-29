import { useRef } from "react";
import useCloseModal from "./useCloseModal";
import { fireEvent, render, screen } from "@testing-library/react";

function TestComponent({ onClose }: { onClose: () => void }) {
  const ref = useRef<HTMLDivElement | null>(null);
  useCloseModal(ref, onClose);

  return (
    <div>
      <div data-testid='outside'>Outside</div>
      <div data-testid='modal' ref={ref}>
        Modal
      </div>
    </div>
  );
}

describe("useCloseModal", () => {
  test("click outside", () => {
    const onClose = jest.fn();

    render(<TestComponent onClose={onClose} />);

    fireEvent.click(screen.getByTestId("outside"));
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("click inside", () => {
    const onClose = jest.fn();

    render(<TestComponent onClose={onClose} />);

    fireEvent.click(screen.getByTestId("modal"));
    expect(onClose).not.toHaveBeenCalled();
  });
});
