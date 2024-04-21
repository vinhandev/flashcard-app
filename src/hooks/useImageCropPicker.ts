import ImageCropPicker from 'react-native-image-crop-picker';
import { OptionProps, CropperOptions } from '../types/react-native-crop-image-picker';

export default function useImageCropPicker() {
  function openLibrary(option: OptionProps) {
    return ImageCropPicker.openPicker(option);
  }

  function openCamera(option: OptionProps) {
    return ImageCropPicker.openCamera(option);
  }

  function openCropper(options: CropperOptions) {
    return ImageCropPicker.openCropper(options);
  }

  return { openLibrary, openCamera, openCropper };
}
