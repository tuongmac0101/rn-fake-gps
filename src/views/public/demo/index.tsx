import { Button, Layout } from "@ui-kitten/components";
import { useThemeStore } from "../../../stores/theme/theme.store";
import { BasicLayout } from "~/components";
import { KitText } from "~/@ui-kit";
import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { useRef, useMemo, useCallback } from "react";

export const DemoView = () => {
  const { themeMode, setThemeMode } = useThemeStore();
  const sheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(() => ["25%", "50%", "90%"], []);

  const handleSnapPress = useCallback((index: number) => {
    sheetRef.current?.snapToIndex(index);
  }, []);
  const handleClosePress = useCallback(() => {
    sheetRef.current?.close();
  }, []);

  return (
    <BasicLayout>
      <Layout style={{ flex: 1, justifyContent: "center", padding: 20 }}>
        <Button
          style={{ marginVertical: 6 }}
          onPress={() => handleSnapPress(2)}
        >
          Snap To 90%
        </Button>
        <Button
          style={{ marginVertical: 6 }}
          onPress={() => handleSnapPress(1)}
        >
          Snap To 50%
        </Button>
        <Button
          style={{ marginVertical: 6 }}
          onPress={() => handleSnapPress(0)}
        >
          Snap To 25%
        </Button>
        <Button style={{ marginVertical: 6 }} onPress={handleClosePress}>
          Close
        </Button>

        <BottomSheet
          ref={sheetRef}
          snapPoints={snapPoints}
          enableDynamicSizing={false}
          backdropComponent={(props) => (
            <BottomSheetBackdrop
              {...props}
              appearsOnIndex={0} // mờ khi sheet mở
              disappearsOnIndex={-1} // ẩn backdrop khi sheet đóng
              pressBehavior="close" // bấm nền ngoài để đóng
            />
          )}
        >
          <BottomSheetView
            style={{
              flex: 1,
              padding: 36,
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <KitText>Awesome 🔥</KitText>
          </BottomSheetView>
        </BottomSheet>
      </Layout>
    </BasicLayout>
  );
};
