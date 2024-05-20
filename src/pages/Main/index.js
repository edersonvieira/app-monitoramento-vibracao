import { SafeAreaView, Modal, View } from "react-native";
import HeadBar from "./components/HeadBar.js";
import SwipeList from "./components/SwipeList.js";
import { StatusBar } from "expo-status-bar";
import { useState, useEffect } from "react";
import { lightTheme } from "./themes.js";
import DetalhesPage from "./components/DetalhesPage.js";
import AWS from "../../utils/aws.js";

const docClient = new AWS.DynamoDB.DocumentClient();

export function Main() {
  const [configBarOpen, setConfigBarOpen] = useState(false);
  const [isModalVisibleAdd, setIsModalVisibleAdd] = useState(false);
  const [isModalVisibleConfig, setIsModalVisibleConfig] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [isDetalhesVisible, setIsDetalhesVisible] = useState(false);
  const [data, setData] = useState([]);

  const toggleConfigBar = () => {
    setConfigBarOpen((prevState) => !prevState);
    setIsModalVisibleConfig(!isModalVisibleConfig);
  };
  
  const toggleAddBar = () => {
    setIsModalVisibleAdd((prevState) => !prevState);
  };


  const handleOpenDetalhes = (item) => {
    setSelectedItem(item);
    setIsDetalhesVisible(true);
  };

  const handleCloseDetalhes = () => {
    setSelectedItem(null);
    setIsDetalhesVisible(false);
  };

  const getUniqueDevices = (items) => {
    const unique = {};
    items.forEach(item => {
      if (!unique[item.id_dispositivo]) {
        unique[item.id_dispositivo] = item;
      }
    });
    return Object.values(unique);
  };

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        TableName: 'reporte'
      };

      docClient.scan(params, function(err, data) {
        if (err) {
          console.log("Erro", err);
        } else {
          console.log("Dados recebidos:", data);
          const uniqueDeviceIds = getUniqueDevices(data.Items);
          setData(uniqueDeviceIds);
        }
      });
    };

    fetchData();
    const interval = setInterval(fetchData, 10000);

    return () => clearInterval(interval);
  }, []);

  let theme = lightTheme;

  return (
    <>
      <SafeAreaView style={{ marginBottom: 55 }}>
        <StatusBar />
        <HeadBar theme={theme} toggleConfigBar={toggleConfigBar} toggleAddBar={toggleAddBar} />
        <SwipeList theme={theme} data={data} onOpenDetalhes={handleOpenDetalhes} />
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