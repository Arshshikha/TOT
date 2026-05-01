import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  TextInput,
  Alert,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

type Review = {
  id: string;
  productName: string;
  productImage: any;
  rating: number;
  reviewText: string;
  date: string;
  status: "Published" | "Pending";
};

const MyReviewsScreen: React.FC = () => {
  const navigation = useNavigation();

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: "1",
      productName: "Topwear1",
      productImage: require("../../../assets/images/Topwear1.png"),
      rating: 4,
      reviewText: "Very good quality.",
      date: "12 Jan 2026",
      status: "Published",
    },
    {
      id: "2",
      productName: "Topwear2",
      productImage: require("../../../assets/images/Topwear2.png"),
      rating: 5,
      reviewText: "Nice product!",
      date: "05 Jan 2026",
      status: "Pending",
    },
  ]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [selectedReview, setSelectedReview] = useState<Review | null>(null);
  const [editedText, setEditedText] = useState("");
  const [editedRating, setEditedRating] = useState(0);

  const handleEdit = (item: Review) => {
    setSelectedReview(item);
    setEditedText(item.reviewText);
    setEditedRating(item.rating);
    setEditModalVisible(true);
  };

  const saveEdit = () => {
    if (selectedReview) {
      setReviews((prev) =>
        prev.map((rev) =>
          rev.id === selectedReview.id
            ? { ...rev, reviewText: editedText, rating: editedRating }
            : rev
        )
      );
      setEditModalVisible(false);
      setSelectedReview(null);
    }
  };

  const handleDelete = (item: Review) => {
    Alert.alert(
      "Delete Review",
      "Are you sure you want to delete this review?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Delete",
          style: "destructive",
          onPress: () => {
            setReviews((prev) =>
              prev.filter((review) => review.id !== item.id)
            );
          },
        },
      ]
    );
  };

  const renderStars = (rating: number) => {
    return (
      <View style={styles.starsRow}>
        {[1, 2, 3, 4, 5].map((star) => (
          <TouchableOpacity
            key={star}
            onPress={() => setEditedRating(star)}
          >
            <Ionicons
              name={star <= rating ? "star" : "star-outline"}
              size={16}
              color="#FF6600"
            />
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderReviewItem = ({ item }: { item: Review }) => (
    <View style={styles.card}>
      <View style={styles.actionRow}>
        <TouchableOpacity onPress={() => handleEdit(item)}>
          <Ionicons name="create-outline" size={18} color="#FF6600" />
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => handleDelete(item)}
          style={{ marginLeft: 12 }}
        >
          <Ionicons name="trash-outline" size={18} color="#FF6600" />
        </TouchableOpacity>
      </View>

      <Image source={item.productImage} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.productName}>{item.productName}</Text>

        {renderStars(item.rating)}

        <Text style={styles.reviewText}>{item.reviewText}</Text>

        <View style={styles.footerRow}>
          <Text style={styles.date}>{item.date}</Text>
          <Text
            style={[
              styles.status,
              { color: item.status === "Published" ? "#FF6600" : "#999" },
            ]}
          >
            {item.status}
          </Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back"
            size={22}
            color="#000"
            style={{ marginTop: 25 }}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Reviews & Ratings</Text>
      </View>

      {reviews.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="chatbubble-outline" size={60} color="#FF6600" />
          <Text style={styles.emptyText}>
            You haven't reviewed any product yet
          </Text>

          <TouchableOpacity
            style={styles.shopButton}
            onPress={() => navigation.navigate("Home" as never)}
          >
            <Text style={styles.shopButtonText}>Start Shopping</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={reviews}
          keyExtractor={(item) => item.id}
          renderItem={renderReviewItem}
          contentContainerStyle={{ padding: 16 }}
        />
      )}

      {/* Edit Modal */}
      <Modal
        visible={editModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setEditModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Review</Text>

            <TextInput
              style={styles.input}
              value={editedText}
              onChangeText={setEditedText}
              multiline
            />

            <Text style={{ marginTop: 10 }}>Rating:</Text>
            <View style={{ flexDirection: "row", marginVertical: 10 }}>
              {[1, 2, 3, 4, 5].map((star) => (
                <TouchableOpacity
                  key={star}
                  onPress={() => setEditedRating(star)}
                >
                  <Ionicons
                    name={star <= editedRating ? "star" : "star-outline"}
                    size={24}
                    color="#FF6600"
                  />
                </TouchableOpacity>
              ))}
            </View>

            <View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
              <TouchableOpacity
                onPress={() => setEditModalVisible(false)}
                style={{ marginRight: 10 }}
              >
                <Text style={{ color: "#FF6600" }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={saveEdit}>
                <Text style={{ color: "#FF6600", fontWeight: "600" }}>
                  Save
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MyReviewsScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFFFFF" },

  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderColor: "#EEE",
  },
  headerTitle: { fontSize: 18, fontWeight: "600", marginLeft: 12, marginTop: 22 },

  card: {
    flexDirection: "row",
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 12,
    marginBottom: 14,
    elevation: 2,
    position: "relative",
  },

  actionRow: {
    position: "absolute",
    top: 10,
    right: 10,
    flexDirection: "row",
    zIndex: 10,
  },

  image: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },

  info: { flex: 1 },

  productName: { fontSize: 15, fontWeight: "600" },

  starsRow: { flexDirection: "row", marginBottom: 6 },

  reviewText: { fontSize: 13, color: "#555", marginBottom: 8 },

  footerRow: { flexDirection: "row", justifyContent: "space-between" },

  date: { fontSize: 12, color: "#999" },

  status: { fontSize: 12, fontWeight: "600" },

  emptyState: { flex: 1, alignItems: "center", justifyContent: "center" },

  emptyText: { fontSize: 16, color: "#555", marginVertical: 16 },

  shopButton: {
    backgroundColor: "#FF6600",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },

  shopButtonText: { color: "#FFF", fontWeight: "600" },

  modalContainer: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: { fontSize: 18, fontWeight: "600", marginBottom: 10 },

  input: {
    borderWidth: 1,
    borderColor: "#CCC",
    borderRadius: 8,
    padding: 10,
    minHeight: 60,
  },
});
