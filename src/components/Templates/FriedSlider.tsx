import {
  Slider,
  SliderMark,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { useState } from "react";

const FriedSlider = () => {
  const [sliderValue, setSliderValue] = useState(50);
  const labelStyles = {
    mt: "2",
    fontSize: "sm",
  };

  return (
    <Slider
      onChange={(val) => setSliderValue(val)}
      step={25}
      whiteSpace={"nowrap"}
    >
      <SliderMark value={0} {...labelStyles} ml={-5}>
        Very Soft
      </SliderMark>
      <SliderMark value={25} {...labelStyles} ml={-4}>
        Soft
      </SliderMark>
      <SliderMark value={50} {...labelStyles} ml={-6}>
        Normal
      </SliderMark>
      <SliderMark value={75} {...labelStyles} ml={-6}>
        Crispy
      </SliderMark>
      <SliderMark value={100} {...labelStyles} ml={-12}>
        Well Done
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb />
    </Slider>
  );
};

export default FriedSlider;
