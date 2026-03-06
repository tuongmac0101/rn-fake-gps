import { StyleSheet, View, ScrollView } from "react-native";
import { useUserStore } from "~/stores/user.store";
import { useAuthStore } from "~/stores/auth.store";
import { KitIcon } from "~/@ui-kit/kit-icon";
import { Button, Card } from "@ui-kitten/components";
import { MainLayout } from "~/views/main/main-layout";
import { KitText } from "~/@ui-kit";
import { useThemeStore } from "~/stores/theme/theme.store";
import { useLanguageConfig } from "~/i18n/use-language-config";
import { languageConfig } from "~/i18n";
import { useTranslation } from "react-i18next";
import { BasicLayout } from "~/components";

export const ProfileTabView = () => {
  const { name, user_name, phone_number, email } = useUserStore();
  const logout = useAuthStore((state) => state.logout);
  const { currentLanguageConfig, languageList, language } = useLanguageConfig();
  const { i18n, t } = useTranslation();

  const handleLogout = async () => {
    await logout();
  };

  const handleLanguageChange = () => {
    i18n.changeLanguage(language === "vi" ? "en" : "vi");
  };

  const { themeMode, setThemeMode } = useThemeStore();

  return (
    <MainLayout>
      <BasicLayout>
        <ScrollView style={styles.container}>
          {/* Header - Avatar & Name */}
          <View style={styles.header}>
            <View style={styles.avatarPlaceholder}>
              <KitIcon name="person-outline" size={100} />
            </View>
            <KitText style={styles.userName}>{name || user_name}</KitText>
          </View>

          {/* Thông tin cá nhân */}
          <Card style={styles.card}>
            <KitText style={styles.cardTitle}>{t("profile.title")}</KitText>
            {/* Thông tin email */}
            <View style={styles.infoRow}>
              <KitIcon name="email-outline" size={20} />
              <View style={styles.infoTextContainer}>
                <KitText style={styles.infoLabel}>
                  {t("profile.email.label")}
                </KitText>
                <KitText style={styles.infoValue}>{email}</KitText>
              </View>
            </View>
            {/* Thông tin số điện thoại */}
            <View style={styles.infoRow}>
              <KitIcon name="phone-outline" size={20} />
              <View style={styles.infoTextContainer}>
                <KitText style={styles.infoLabel}>
                  {t("profile.phoneNumber.label")}
                </KitText>
                <KitText style={styles.infoValue}>{phone_number}</KitText>
              </View>
            </View>
            {/* Ngôn ngữ */}
            <View style={styles.infoRowTheme}>
              <View style={styles.infoThemeLeft}>
                <KitIcon name="globe-outline" size={20} />
                <View style={styles.infoTextContainer}>
                  <KitText style={styles.infoLabel}>
                    {t("profile.changeLanguage.title")}
                  </KitText>
                  <KitText style={styles.infoValue}>
                    {currentLanguageConfig.icon}
                  </KitText>
                </View>
              </View>
              <Button
                style={styles.halfWidthButton}
                appearance="outline"
                status="primary"
                size="small"
                onPress={handleLanguageChange}
              >
                {`${t("profile.changeLanguage.action")} ${
                  language === "vi"
                    ? languageConfig.languages.en.icon
                    : languageConfig.languages.vi.icon
                }`}
              </Button>
            </View>

            {/* Chế độ */}
            <View style={styles.infoRowTheme}>
              <View style={styles.infoThemeLeft}>
                <KitIcon
                  name={themeMode === "light" ? "moon-outline" : "sun-outline"}
                  size={20}
                />
                <View style={styles.infoTextContainer}>
                  <KitText style={styles.infoLabel}>
                    {t("profile.theme.label")}
                  </KitText>
                  <KitText style={styles.infoValue}>
                    {themeMode === "light"
                      ? t("profile.theme.light")
                      : t("profile.theme.dark")}
                  </KitText>
                </View>
              </View>
              <Button
                style={styles.halfWidthButton}
                appearance="outline"
                status="primary"
                size="small"
                onPress={() =>
                  setThemeMode(themeMode === "light" ? "dark" : "light")
                }
              >
                {t("profile.theme.toggle", {
                  mode:
                    themeMode === "light"
                      ? t("profile.theme.dark")
                      : t("profile.theme.light"),
                })}
              </Button>
            </View>
          </Card>

          {/* Nút Đăng xuất */}
          <Button onPress={handleLogout}>{t("profile.action.logout")}</Button>
        </ScrollView>
      </BasicLayout>
    </MainLayout>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  container: {
    flex: 1,
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
    borderWidth: 1,
    borderColor: "#e0e0e0",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
  },
  card: {
    borderRadius: 10,
    padding: 20,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    paddingBottom: 8,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  // Style mới để căn chỉnh nút
  infoRowTheme: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  infoThemeLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  halfWidthButton: {
    width: "50%", // 👈 nút chiếm 50% chiều ngang
    alignSelf: "flex-end",
  },
  infoTextContainer: {
    marginLeft: 12,
  },
  infoLabel: {
    fontSize: 14,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "500",
  },
  // Style mới cho nút Đăng xuất
  logoutButton: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 20,
  },
  logoutButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
