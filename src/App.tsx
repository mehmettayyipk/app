import React, { useState } from 'react';
import { ScreenId, PaymentMethod, ExpenseCategory } from './types';
import { PhoneFrame } from './components/PhoneFrame';
import { ScreenNavigator } from './components/ScreenNavigator';

// 17 Screens with precise filenames and exports
import { Screen01PhoneLogin } from './screens/Screen01PhoneLogin';
import { Screen02SmsVerification } from './screens/Screen02SmsVerification';
import { Screen03CreateAccount } from './screens/Screen03CreateAccount';
import { Screen04VehicleInfo } from './screens/Screen04VehicleInfo';
import { Screen05CompleteApplication } from './screens/Screen05CompleteApplication';
import { Screen06UnderReview } from './screens/Screen06UnderReview';
import { Screen07HomeDashboard } from './screens/Screen07HomeDashboard';
import { Screen08AddIncome } from './screens/Screen08AddIncome';
import { Screen09AddExpense } from './screens/Screen09AddExpense';
import { Screen10Map } from './screens/Screen10Map';
import { Screen11HazardDetail } from './screens/Screen11HazardDetail';
import { Screen12Chat } from './screens/Screen12Chat';
import { Screen13CreateGroup } from './screens/Screen13CreateGroup';
import { Screen14EmergencySos } from './screens/Screen14EmergencySos';
import { Screen15ActiveSos } from './screens/Screen15ActiveSos';
import { Screen16ProfileSettings } from './screens/Screen16ProfileSettings';
import { Screen17AdminDashboard } from './screens/Screen17AdminDashboard';

import { INITIAL_HAZARDS } from './data/mockData';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenId>('home');
  const [isFrameMode, setIsFrameMode] = useState<boolean>(true);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  // App-level state flows
  const [phoneNumber, setPhoneNumber] = useState('532 849 20 44');
  const [totalIncome, setTotalIncome] = useState(3100);
  const [totalExpense, setTotalExpense] = useState(650);
  const [cashAmount, setCashAmount] = useState(1850);
  const [accountAmount, setAccountAmount] = useState(1250);

  // Navigation handlers
  const handlePhoneSubmit = (phone: string) => {
    setPhoneNumber(phone);
    setCurrentScreen('sms');
  };

  const handleSmsVerifySuccess = () => {
    setCurrentScreen('create_account');
  };

  const handleCreateAccountContinue = () => {
    setCurrentScreen('vehicle_info');
  };

  const handleVehicleContinue = () => {
    setCurrentScreen('complete_app');
  };

  const handleApplicationSubmit = () => {
    setCurrentScreen('under_review');
  };

  const handleSaveIncome = (data: { amount: number; method: PaymentMethod; km?: number }) => {
    setTotalIncome((prev) => prev + data.amount);
    if (data.method === 'Nakit') {
      setCashAmount((prev) => prev + data.amount);
    } else {
      setAccountAmount((prev) => prev + data.amount);
    }
    setCurrentScreen('home');
  };

  const handleSaveExpense = (data: {
    category: ExpenseCategory;
    amount: number;
    fuelPricePerLiter?: number;
    calculatedLiters?: number;
    description?: string;
  }) => {
    setTotalExpense((prev) => prev + data.amount);
    setCurrentScreen('home');
  };

  // Render individual screen inside mobile frame or desktop container
  const renderScreen = () => {
    switch (currentScreen) {
      case 'login':
        return (
          <Screen01PhoneLogin
            onContinue={handlePhoneSubmit}
            initialPhone={phoneNumber}
          />
        );

      case 'sms':
        return (
          <Screen02SmsVerification
            phoneNumber={phoneNumber}
            onBack={() => setCurrentScreen('login')}
            onVerifySuccess={handleSmsVerifySuccess}
          />
        );

      case 'create_account':
        return (
          <Screen03CreateAccount
            onBack={() => setCurrentScreen('sms')}
            onContinue={handleCreateAccountContinue}
          />
        );

      case 'vehicle_info':
        return (
          <Screen04VehicleInfo
            onBack={() => setCurrentScreen('create_account')}
            onContinue={handleVehicleContinue}
          />
        );

      case 'complete_app':
        return (
          <Screen05CompleteApplication
            onBack={() => setCurrentScreen('vehicle_info')}
            onSubmit={handleApplicationSubmit}
          />
        );

      case 'under_review':
        return (
          <Screen06UnderReview
            onSimulateApproved={() => setCurrentScreen('home')}
            onGoToAdminPanel={() => setCurrentScreen('admin_panel')}
          />
        );

      case 'home':
        return (
          <Screen07HomeDashboard
            onNavigate={setCurrentScreen}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            netEarnings={totalIncome - totalExpense}
            cashAmount={cashAmount}
            accountAmount={accountAmount}
          />
        );

      case 'add_income':
        return (
          <Screen08AddIncome
            onBack={() => setCurrentScreen('home')}
            onSaveIncome={handleSaveIncome}
          />
        );

      case 'add_expense':
        return (
          <Screen09AddExpense
            onBack={() => setCurrentScreen('home')}
            onSaveExpense={handleSaveExpense}
          />
        );

      case 'map':
        return (
          <Screen10Map
            onNavigate={setCurrentScreen}
          />
        );

      case 'hazard_detail':
        return (
          <div className="flex-1 flex flex-col justify-end bg-slate-950">
            <Screen11HazardDetail
              hazard={INITIAL_HAZARDS[0]}
              onClose={() => setCurrentScreen('map')}
              onVerifyStillThere={() => alert('Tehlike doğrulandı!')}
              onMarkResolved={() => setCurrentScreen('map')}
              onGetDirections={() => setCurrentScreen('map')}
            />
          </div>
        );

      case 'chat':
        return <Screen12Chat onNavigate={setCurrentScreen} />;

      case 'create_group':
        return (
          <Screen13CreateGroup
            onBack={() => setCurrentScreen('chat')}
            onCreateGroup={() => setCurrentScreen('chat')}
          />
        );

      case 'emergency_sos':
        return (
          <Screen14EmergencySos
            onNavigate={setCurrentScreen}
            onActivateSos={() => setCurrentScreen('active_sos')}
          />
        );

      case 'active_sos':
        return (
          <Screen15ActiveSos
            onNavigate={setCurrentScreen}
            onCancelSos={() => setCurrentScreen('emergency_sos')}
            onCompleteSos={() => setCurrentScreen('home')}
          />
        );

      case 'profile_settings':
        return (
          <Screen16ProfileSettings
            onNavigate={setCurrentScreen}
            onLogout={() => setCurrentScreen('login')}
          />
        );

      case 'admin_panel':
        return <Screen17AdminDashboard onBackToApp={() => setCurrentScreen('home')} />;

      default:
        return (
          <Screen07HomeDashboard
            onNavigate={setCurrentScreen}
            totalIncome={totalIncome}
            totalExpense={totalExpense}
            netEarnings={totalIncome - totalExpense}
            cashAmount={cashAmount}
            accountAmount={accountAmount}
          />
        );
    }
  };

  // If Admin Panel is selected, show it full-bleed desktop width
  const isAdminScreen = currentScreen === 'admin_panel';

  return (
    <div className={`min-h-screen w-full ${isDarkMode ? 'dark bg-slate-950 text-slate-100' : 'bg-slate-100 text-slate-900'} flex flex-col transition-colors`}>
      {/* Top Prototype Navigation Bar */}
      <ScreenNavigator
        currentScreen={currentScreen}
        onSelectScreen={setCurrentScreen}
        isFrameMode={isFrameMode}
        onToggleFrameMode={() => setIsFrameMode(!isFrameMode)}
        isDarkMode={isDarkMode}
        onToggleDarkMode={() => setIsDarkMode(!isDarkMode)}
      />

      {/* Main App Content Viewport */}
      {isAdminScreen ? (
        <main className="flex-1 w-full flex flex-col overflow-auto">
          {renderScreen()}
        </main>
      ) : (
        <main className="flex-1 w-full flex items-center justify-center p-2 sm:p-5 overflow-hidden">
          {isFrameMode ? (
            <PhoneFrame isFrameMode={isFrameMode}>{renderScreen()}</PhoneFrame>
          ) : (
            <div className="w-full max-w-[420px] h-[844px] bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-2xl">
              {renderScreen()}
            </div>
          )}
        </main>
      )}
    </div>
  );
}
