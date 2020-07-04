import React, {useEffect, useState} from "react";
import api from './services/api'
import {
    SafeAreaView,
    View,
    FlatList,
    Text,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
} from "react-native";

export default function App() {
    const [repositories, setRepositories] = useState([])

    async function handleLikeRepository(id) {
        await api.post(`repositories/${id}/like`)
        const repositoriesCopy = [...repositories]
        const repositoryToModify = repositoriesCopy.find(repository => repository.id === id)
        let oldQtyLikes = parseInt(repositoryToModify.likes)
        let newQtyLikes = oldQtyLikes + 1
        repositoryToModify.likes = newQtyLikes
        const repositoryCopyIndex = repositoriesCopy.findIndex(repository => repository.id === id)
        repositoriesCopy[repositoryCopyIndex] = repositoryToModify
        setRepositories(repositoriesCopy)
    }

    useEffect(() => {
        api.get('repositories').then((response) => {
            setRepositories(response.data)
        })
    }, [])
    return (
        <>
            <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>
            {repositories.map(repository =>
                (<SafeAreaView style={styles.container} key={repository.id}>
                    <View style={styles.repositoryContainer}>
                        <Text style={styles.repository}>{repository.title}</Text>

                        <View style={styles.techsContainer}>
                            {repository.techs.map(tech => <Text style={styles.tech} key={tech}>
                                {tech}
                            </Text>)}

                        </View>

                        <View style={styles.likesContainer}>
                            <Text
                                style={styles.likeText}
                                // Remember to replace "1" below with repository ID: {`repository-likes-${repository.id}`}
                                testID={`repository-likes-${repository.id}`}
                            >
                                {repository.likes} curtidas
                            </Text>
                        </View>

                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleLikeRepository(repository.id)}
                            // Remember to replace "1" below with repository ID: {`like-button-${repository.id}`}
                            testID={`like-button-${repository.id}`}
                        >
                            <Text style={styles.buttonText}>Curtir</Text>
                        </TouchableOpacity>
                    </View>
                </SafeAreaView>))
            }

        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#7159c1",
    },
    repositoryContainer: {
        marginBottom: 15,
        marginHorizontal: 15,
        backgroundColor: "#fff",
        padding: 20,
    },
    repository: {
        fontSize: 32,
        fontWeight: "bold",
    },
    techsContainer: {
        flexDirection: "row",
        marginTop: 10,
    },
    tech: {
        fontSize: 12,
        fontWeight: "bold",
        marginRight: 10,
        backgroundColor: "#04d361",
        paddingHorizontal: 10,
        paddingVertical: 5,
        color: "#fff",
    },
    likesContainer: {
        marginTop: 15,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    likeText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
    },
    button: {
        marginTop: 10,
    },
    buttonText: {
        fontSize: 14,
        fontWeight: "bold",
        marginRight: 10,
        color: "#fff",
        backgroundColor: "#7159c1",
        padding: 15,
    },
});
