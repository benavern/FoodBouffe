import React from 'react'
import { Modal, StyleSheet, View } from 'react-native'
import IconButton from '../Button/IconButton'
import { colors } from '../../styles/variables'

export default function ({ children, close, visible }) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={() => { close() }}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalCloseBtn}>
          <IconButton
            iconName="cross"
            onPress={() => { close() }} />
        </View>

        <View style={styles.modalView}>
          {children}
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalOverlay: {
    backgroundColor: colors.overlay,
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 12,
    paddingTop: 52,
    paddingBottom: 10,
  },
  modalCloseBtn: {
    position: "absolute",
    top: 10,
    right: 12
  },
  modalView: {
    backgroundColor: colors.background,
    paddingVertical: 20,
    paddingHorizontal: 16,
    borderRadius: 20,
  }
})
