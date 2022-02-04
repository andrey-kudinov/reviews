# Image comparison slider

Image Comparison Slider is a slider that can be controlled, can be pulled by the customer to show less of the before image and a more noteworthy measure of the after image, and the a different way. These types of image comparison sliders are quite popular at the moment and very effective in showing the differences between 2 images. They are useful in many industries to make comparisons between two images, usually a before-after kind, with the two images superimposed on each other.

### Commands

| Command    | Description           |
| ---------- | --------------------- |
| yarn       | install dependencies  |
| yarn dev   | serve with hot reload |
| yarn build | build the project         |
| yarn lint  | run eslint            |

### Props

| Name           | Type   | Description                            |
| -------------- | ------ | -------------------------------------- |
| imageLeft      | string |  left image URL (**required**)                |
| imageRight     | string |  right image URL (**required**)               |
| blurRightImage | number |  blur radius (px), a larger value will create more blur |
| handleText     | string |  handler text                           |
| titleLeft      | string |  left title                             |
| titleRight     | string |  right title                            |
