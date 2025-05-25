import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import {COLORS, SIZES, icons} from '../constants';

const FilterModal = ({isVisible, onClose}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Share this knapp</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>×</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.shareOptions}>
            <TouchableOpacity style={styles.shareOption}>
              <Image source={icons.share} style={styles.shareIcon} />
              <Text style={styles.shareText}>Twitter</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareOption}>
              <Image source={icons.share} style={styles.shareIcon} />
              <Text style={styles.shareText}>Facebook</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareOption}>
              <Image source={icons.share} style={styles.shareIcon} />
              <Text style={styles.shareText}>WhatsApp</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.shareOption}>
              <Image source={icons.share} style={styles.shareIcon} />
              <Text style={styles.shareText}>Copy Link</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: SIZES.padding,
    minHeight: 300,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  shareOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  shareOption: {
    width: '45%',
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
    backgroundColor: COLORS.lightGray,
    borderRadius: 10,
  },
  shareIcon: {
    width: 30,
    height: 30,
    marginBottom: 10,
    tintColor: COLORS.primary,
  },
  shareText: {
    fontSize: 14,
  },
});

export default FilterModal;