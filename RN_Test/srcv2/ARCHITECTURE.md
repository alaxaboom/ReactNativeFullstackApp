# Идеальная архитектура приложения

## Структура проекта
она так выглядит по моему изначальному плану в принципе можно и что то добавить создать какой нибудь новый виджет или фичу, если что предлагай я посмотрю может одобрю
в pages файлы с минимум кода, если есть какая то логика и дизайн в index.ts файле в этой папке ее нужно стараться переносить в features и widgets 
```
src/
├── app/
│   ├── providers/
│   │   ├── StoreProvider.tsx
│   │   ├── NavigationProvider.tsx
│   │   └── SafeAreaProvider.tsx
│   ├── router/
│   │   ├── AppNavigator.tsx
│   │   └── navigation-types.ts
│   └── index.tsx
│
├── processes/
│   ├── auth-init/
│   │   ├── lib/
│   │   │   └── initAuth.ts
│   │   └── index.ts
│   ├── token-refresh/
│   │   ├── lib/
│   │   │   └── refreshTokenFlow.ts
│   │   └── index.ts
│   └── loan-application-flow/
│       ├── lib/
│       │   ├── loanFlowState.ts
│       │   └── loanFlowSteps.ts
│       └── index.ts
│
├── pages/
│   ├── home/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── first-page/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── login/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── register/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── otp-verification/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── password-reset/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── passcode/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── biometrics/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── loan-application/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── loans-list/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── profile/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── how-to-pay/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── how-to-pay-extension/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── locations/
│   │   ├── index.tsx
│   │   └── styles.ts
│   ├── contact-us/
│   │   ├── index.tsx
│   │   └── styles.ts
│   └── call-me-back/
│       ├── index.tsx
│       └── styles.ts
│
├── widgets/
│   ├── bottom-navigation/
│   │   ├── ui/
│   │   │   └── BottomNavigation.tsx
│   │   └── index.ts
│   ├── loading-screen/
│   │   ├── ui/
│   │   │   └── LoadingScreen.tsx
│   │   └── index.ts
│   ├── loan-application-flow/
│   │   ├── ui/
│   │   │   ├── LoanApplicationFlow.tsx
│   │   │   ├── StepIndicator.tsx
│   │   │   ├── ProductSelectionStep.tsx
│   │   │   ├── CalculatorStep.tsx
│   │   │   ├── RegistrationStep.tsx
│   │   │   ├── DocumentsStep.tsx
│   │   │   └── ConfirmationStep.tsx
│   │   └── index.ts
│   ├── home-dashboard/
│   │   ├── ui/
│   │   │   ├── HomeDashboard.tsx
│   │   │   ├── UserHeader.tsx
│   │   │   ├── LoansCarousel.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   └── ProductsSection.tsx
│   │   └── index.ts
│   └── location-map/
│       ├── ui/
│       │   ├── LocationMapView.tsx
│       │   ├── LocationListView.tsx
│       │   ├── LocationSearchBar.tsx
│       │   ├── LocationClusterMarker.tsx
│       │   ├── LocationItem.tsx
│       │   └── LocationDetail.tsx
│       └── index.ts
│
├── features/
│   ├── auth/
│   │   ├── login/
│   │   │   ├── ui/
│   │   │   │   └── LoginForm.tsx
│   │   │   ├── model/
│   │   │   │   └── useLogin.ts
│   │   │   └── index.ts
│   │   ├── register/
│   │   │   ├── ui/
│   │   │   │   └── RegisterForm.tsx
│   │   │   ├── model/
│   │   │   │   └── useRegister.ts
│   │   │   └── index.ts
│   │   ├── otp-verification/
│   │   │   ├── ui/
│   │   │   │   └── OTPForm.tsx
│   │   │   ├── model/
│   │   │   │   └── useOTPVerification.ts
│   │   │   └── index.ts
│   │   ├── password-reset/
│   │   │   ├── ui/
│   │   │   │   └── PasswordResetForm.tsx
│   │   │   ├── model/
│   │   │   │   └── usePasswordReset.ts
│   │   │   └── index.ts
│   │   └── logout/
│   │       ├── ui/
│   │       │   └── LogoutButton.tsx
│   │       └── index.ts
│   │
│   ├── passcode/
│   │   ├── create-passcode/
│   │   │   ├── ui/
│   │   │   │   ├── CreatePasscodeForm.tsx
│   │   │   │   ├── PasscodeInput.tsx
│   │   │   │   ├── PasscodeKeyboard.tsx
│   │   │   │   └── StepIndicator.tsx
│   │   │   ├── model/
│   │   │   │   └── useCreatePasscode.ts
│   │   │   └── index.ts
│   │   └── enter-passcode/
│   │       ├── ui/
│   │       │   ├── EnterPasscodeForm.tsx
│   │       │   ├── PasscodeInput.tsx
│   │       │   ├── PasscodeKeyboard.tsx
│   │       │   └── StepIndicator.tsx
│   │       ├── model/
│   │       │   └── useEnterPasscode.ts
│   │       └── index.ts
│   │
│   ├── biometrics/
│   │   ├── enable-biometrics/
│   │   │   ├── ui/
│   │   │   │   ├── EnableBiometricsForm.tsx
│   │   │   │   ├── BiometricsIcon.tsx
│   │   │   │   ├── ActionButtons.tsx
│   │   │   │   ├── StepIndicator.tsx
│   │   │   │   └── TitleSection.tsx
│   │   │   ├── model/
│   │   │   │   ├── useEnableBiometrics.ts
│   │   │   │   └── biometricsService.ts
│   │   │   └── index.ts
│   │   └── authenticate-biometrics/
│   │       ├── ui/
│   │       │   └── BiometricsPrompt.tsx
│   │       └── index.ts
│   │
│   ├── loan-application/
│   │   ├── select-product/
│   │   │   ├── ui/
│   │   │   │   └── ProductCard.tsx
│   │   │   ├── model/
│   │   │   │   └── useProductSelection.ts
│   │   │   └── index.ts
│   │   ├── calculate-loan/
│   │   │   ├── ui/
│   │   │   │   └── LoanCalculatorForm.tsx
│   │   │   ├── model/
│   │   │   │   └── useLoanCalculator.ts
│   │   │   └── index.ts
│   │   ├── fill-registration/
│   │   │   ├── ui/
│   │   │   │   └── RegistrationForm.tsx
│   │   │   ├── model/
│   │   │   │   ├── useRegistrationForm.ts
│   │   │   │   └── useRegistrationFlow.ts
│   │   │   └── index.ts
│   │   ├── upload-documents/
│   │   │   ├── ui/
│   │   │   │   └── DocumentUploadForm.tsx
│   │   │   ├── model/
│   │   │   │   └── useDocumentUpload.ts
│   │   │   └── index.ts
│   │   └── confirm-application/
│   │       ├── ui/
│   │       │   └── ConfirmationDetails.tsx
│   │       └── index.ts
│   │
│   ├── profile/
│   │   ├── edit-profile/
│   │   │   ├── ui/
│   │   │   │   ├── EditProfileModal.tsx
│   │   │   │   ├── PersonalDataSection.tsx
│   │   │   │   └── SettingsSection.tsx
│   │   │   ├── model/
│   │   │   │   └── useEditProfile.ts
│   │   │   └── index.ts
│   │   ├── upload-avatar/
│   │   │   ├── ui/
│   │   │   │   ├── AvatarSection.tsx
│   │   │   │   └── PhotoModal.tsx
│   │   │   ├── model/
│   │   │   │   └── useUploadAvatar.ts
│   │   │   └── index.ts
│   │   └── view-profile/
│   │       ├── ui/
│   │       │   └── ProfileView.tsx
│   │       └── index.ts
│   │
│   ├── loans-list/
│   │   ├── view-loans/
│   │   │   ├── ui/
│   │   │   │   ├── LoansTab.tsx
│   │   │   │   ├── LoanCard.tsx
│   │   │   │   └── CreditDetailsModal.tsx
│   │   │   └── index.ts
│   │   ├── view-applications/
│   │   │   ├── ui/
│   │   │   │   ├── ApplicationsTab.tsx
│   │   │   │   └── ApplicationCard.tsx
│   │   │   └── index.ts
│   │   └── loans-tabs/
│   │       ├── ui/
│   │       │   └── LoansTabs.tsx
│   │       └── index.ts
│   │
│   ├── location/
│   │   ├── search-locations/
│   │   │   ├── ui/
│   │   │   │   └── LocationSearchBar.tsx
│   │   │   └── index.ts
│   │   ├── view-location-details/
│   │   │   ├── ui/
│   │   │   │   ├── LocationItem.tsx
│   │   │   │   └── LocationDetail.tsx
│   │   │   └── index.ts
│   │   └── view-location-map/
│   │       ├── ui/
│   │       │   └── LocationMapView.tsx
│   │       └── index.ts
│   │
│   └── contact/
│       ├── call-me-back/
│       │   ├── ui/
│       │   │   ├── CallMeBackForm.tsx
│       │   │   └── SuccessScreen.tsx
│       │   ├── model/
│       │   │   └── useCallMeBack.ts
│       │   └── index.ts
│       └── contact-us/
│           ├── ui/
│           │   ├── ContactGroup.tsx
│           │   ├── ContactItem.tsx
│           │   └── CallMeBackButton.tsx
│           └── index.ts
│
├── entities/
│   ├── user/
│   │   ├── model/
│   │   │   ├── userSlice.ts
│   │   │   ├── userApi.ts
│   │   │   ├── types.ts
│   │   │   └── selectors.ts
│   │   ├── ui/
│   │   │   └── UserCard.tsx
│   │   └── index.ts
│   │
│   ├── loan-application/
│   │   ├── model/
│   │   │   ├── loanSlice.ts
│   │   │   ├── applicationApi.ts
│   │   │   ├── types.ts
│   │   │   ├── selectors.ts
│   │   │   └── loanCalculator.ts
│   │   ├── ui/
│   │   │   └── ApplicationStatusBadge.tsx
│   │   └── index.ts
│   │
│   ├── location/
│   │   ├── model/
│   │   │   ├── locationApi.ts
│   │   │   ├── types.ts
│   │   │   └── selectors.ts
│   │   ├── ui/
│   │   │   └── LocationCard.tsx
│   │   └── index.ts
│   │
│   └── product/
│       ├── model/
│       │   ├── productTypes.ts
│       │   └── productConfig.ts
│       ├── ui/
│       │   └── ProductIcon.tsx
│       └── index.ts
│
└── shared/
    ├── api/
    │   ├── baseQuery.ts
    │   ├── store.ts
    │   ├── types.ts
    │   └── errorHandler.ts
    ├── ui/
    │   ├── Button/
    │   │   ├── Button.tsx
    │   │   └── index.ts
    │   ├── Input/
    │   │   ├── Input.tsx
    │   │   └── index.ts
    │   ├── Modal/
    │   │   ├── Modal.tsx
    │   │   └── index.ts
    │   ├── Card/
    │   │   ├── Card.tsx
    │   │   └── index.ts
    │   ├── ActionButton/
    │   │   ├── ActionButton.tsx
    │   │   └── index.ts
    │   ├── BenefitCard/
    │   │   ├── BenefitCard.tsx
    │   │   └── index.ts
    │   └── StepIndicator/
    │       ├── StepIndicator.tsx
    │       └── index.ts
    ├── lib/
    │   ├── react-redux/
    │   │   └── hooks.ts
    │   └── react-navigation/
    │       └── hooks.ts
    ├── hooks/
    │   ├── useAuth.ts
    │   ├── useLoanManagement.ts
    │   └── useRegistrationFlow.ts
    ├── utils/
    │   ├── errorUtils.ts
    │   ├── smartNavigation.ts
    │   ├── phoneUtils.ts
    │   ├── dateUtils.ts
    │   └── formatUtils.ts
    ├── config/
    │   ├── constants.ts
    │   ├── routes.ts
    │   └── apiConfig.ts
    └── types/
        ├── index.ts
        ├── navigation.ts
        └── api.ts
```

## Описание слоев архитектуры

### app/
Инициализация приложения, провайдеры и роутинг.

### processes/
Бизнес-процессы приложения (инициализация авторизации, обновление токенов, поток заявки на займ).

### pages/
Страницы приложения. Каждая страница содержит только `index.tsx` и `styles.ts`. Вся логика и UI компоненты вынесены в `features` и `widgets`.

### widgets/
Составные UI компоненты, которые используются на нескольких страницах или содержат сложную логику отображения.

### features/
Функциональные возможности приложения. Каждая фича содержит:
- `ui/` - компоненты интерфейса
- `model/` - бизнес-логика, хуки, сервисы
- `index.ts` - публичный API фичи

### entities/
Бизнес-сущности приложения (пользователь, заявка, локация, продукт). Содержат:
- `model/` - слайсы, API, типы, селекторы
- `ui/` - UI компоненты сущности
- `index.ts` - публичный API сущности

### shared/
Общие компоненты, утилиты, конфигурация, типы, используемые во всем приложении.

## Принципы организации

1. **Pages** - только композиция, без логики
2. **Features** - изолированные функциональные возможности
3. **Widgets** - переиспользуемые составные компоненты
4. **Entities** - бизнес-сущности с данными и логикой
5. **Shared** - общие утилиты и компоненты
6. **Processes** - сложные бизнес-процессы

