import { SafeAreaView, Modal, TouchableWithoutFeedback, View } from "react-native";
import HeadBar from "./components/HeadBar.js";
import SwipeList from "./components/SwipeList.js";
import ConfigBar from "./components/ConfigBar.js";
import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import AddBar from "./components/AddBar.js";
import {lightTheme} from "./themes.js";
import DetalhesPage from "./components/DetalhesPage.js";
import * as Animatable from 'react-native-animatable';

export function Main() {
  const [configBarOpen, setConfigBarOpen] = useState(false);
  const [addBarOpen, setAddBarOpen] = useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalVisibleConfig, setIsModalVisibleConfig] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetalhesVisible, setIsDetalhesVisible] = useState(false);

  const toggleConfigBar = () => {
    setConfigBarOpen((prevState) => !prevState);
    setIsModalVisibleConfig(!isModalVisibleConfig);
  };
  
  const toggleAddBar = () => {
    setAddBarOpen((prevState) => !prevState);
    setIsModalVisibleAdd(!isModalVisibleAdd);
  };

  const handleCloseModalConfig = () => {
    setIsModalVisibleConfig(false);
    setConfigBarOpen(false);
  };
  
  const handleCloseModalAdd = () => {
    setIsModalVisibleAdd(false);
    setAddBarOpen(false);
  }

  const handleOpenDetalhes = (item) => {
    setSelectedItem(item);
    setIsDetalhesVisible(true);
  }

  const handleCloseDetalhes = () => {
    setSelectedItem(null);
    setIsDetalhesVisible(false);
  }

  let theme = lightTheme;

  const data = [
    { id: 1, equipamento: "Equipamento 1", x: 10, y: 20, z: 30, status: true },
  ]


  return (
    <>
      <SafeAreaView style={{ marginBottom: 55 }}>
        <StatusBar />
        <HeadBar theme={theme} toggleConfigBar={toggleConfigBar} toggleAddBar={toggleAddBar} />
        <SwipeList theme={theme} data={data} onOpenDetalhes={handleOpenDetalhes} />
        <Modal animationType="fade" transparent={true} visible={isModalVisibleConfig} onRequestClose={handleCloseModalConfig}>
          <TouchableWithoutFeedback onPress={handleCloseModalConfig}>
            <View style={theme.modalContainer}>
              {configBarOpen && <ConfigBar theme={theme} />}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal animationType="fade" transparent={true} visible={isModalVisibleAdd} onRequestClose={handleCloseModalAdd}>
          <TouchableWithoutFeedback onPress={handleCloseModalAdd}>
            <View style={theme.modalContainer}>
              {addBarOpen && <AddBar toggleAddBar={toggleAddBar} theme={theme} />}
            </View>
          </TouchableWithoutFeedback>
        </Modal>
        <Modal animationType="fade" visible={isDetalhesVisible} onRequestClose={handleCloseDetalhes}>
            <View>
              <View>
                {selectedItem && <DetalhesPage item={selectedItem} onClose={handleCloseDetalhes} theme={theme} />}
              </View>
            </View>
        </Modal>
      </SafeAreaView>
    </>
  );
}

export default Main;
