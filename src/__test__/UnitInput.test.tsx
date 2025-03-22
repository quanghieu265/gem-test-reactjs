import { render } from "@testing-library/react";
import { expect, it } from "vitest";
import UnitInput from "../components/UnitInput";

it("renders UnitInput component", () => {
  const { asFragment } = render(<UnitInput />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders with default value", () => {
  const { asFragment } = render(<UnitInput defaultValue={50} />);
  expect(asFragment()).toMatchSnapshot();
});

it("renders with px unit", () => {
  const { asFragment } = render(<UnitInput defaultUnit="px" />);
  expect(asFragment()).toMatchSnapshot();
});
