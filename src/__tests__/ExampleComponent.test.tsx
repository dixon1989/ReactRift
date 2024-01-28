import React from "react";
import renderer from "react-test-renderer";
import ExampleComponent from "../ExampleComponent";

describe("ExampleComponent", () => {
  it("renders correctly", () => {
    // Render the component
    const component = renderer.create(<ExampleComponent />);

    // Get the rendered tree
    const tree = component.toJSON();

    // Assert that the component matches the snapshot
    expect(tree).toMatchSnapshot();
  });
});
