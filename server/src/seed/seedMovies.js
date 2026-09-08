import mongoose from "mongoose";
import Movies from "../models/Movie.js";
import AppDataSource from "../data-source.js";

const tmdbImage = (size, path) => `https://image.tmdb.org/t/p/${size}${path}`;

const movies = [
    {
        title: "The Dark Knight",
        rating: "9.0",
        upvotes: 185000,
        posterUrl: tmdbImage("w500", "/qJ2tW6WMUDux911r6m7haRef0WH.jpg"),
        genres: ["Action", "Crime", "Drama"],
        cast: [
            { profilePicture: "https://i.pravatar.cc/185?img=11", name: "Christian Bale", alias: "Bruce Wayne / Batman" },
            { profilePicture: "https://i.pravatar.cc/185?img=12", name: "Heath Ledger", alias: "Joker" }
        ]
    },
    {
        title: "Inception",
        rating: "8.8",
        upvotes: 172000,
        posterUrl: tmdbImage("w500", "/oYuLEt3zVCKqBfl8e5JQq0nYJ7R.jpg"),
        genres: ["Action", "Science Fiction", "Thriller"],
        cast: [
            { profilePicture: "https://i.pravatar.cc/185?img=13", name: "Leonardo DiCaprio", alias: "Cobb" },
            { profilePicture: "https://i.pravatar.cc/185?img=14", name: "Joseph Gordon-Levitt", alias: "Arthur" }
        ]
    },
    {
        title: "Interstellar",
        rating: "8.7",
        upvotes: 168000,
        posterUrl: tmdbImage("w500", "/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg"),
        genres: ["Adventure", "Drama", "Science Fiction"],
        cast: [
            { profilePicture: "https://i.pravatar.cc/185?img=15", name: "Matthew McConaughey", alias: "Cooper" },
            { profilePicture: "https://i.pravatar.cc/185?img=16", name: "Anne Hathaway", alias: "Brand" }
        ]
    },
    {
        title: "Dune: Part Two",
        rating: "8.6",
        upvotes: 143000,
        posterUrl: tmdbImage("w500", "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg"),
        genres: ["Science Fiction", "Adventure", "Drama"],
        cast: [
            { profilePicture: "https://i.pravatar.cc/185?img=17", name: "Timothee Chalamet", alias: "Paul Atreides" },
            { profilePicture: "https://i.pravatar.cc/185?img=18", name: "Zendaya", alias: "Chani" }
        ]
    },
    {
        title: "Oppenheimer",
        rating: "8.6",
        upvotes: 139000,
        posterUrl: tmdbImage("w500", "/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg"),
        genres: ["Drama", "History"],
        cast: [
            { profilePicture: "https://i.pravatar.cc/185?img=19", name: "Cillian Murphy", alias: "J. Robert Oppenheimer" },
            { profilePicture: "https://i.pravatar.cc/185?img=20", name: "Emily Blunt", alias: "Katherine Oppenheimer" }
        ]
    },
    {
        title: "Spider-Man: Into the Spider-Verse",
        rating: "8.4",
        upvotes: 121000,
        posterUrl: tmdbImage("w500", "/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg"),
        genres: ["Animation", "Action", "Adventure"],
        cast: [
            { profilePicture: "https://i.pravatar.cc/185?img=21", name: "Shameik Moore", alias: "Miles Morales" },
            { profilePicture: "https://i.pravatar.cc/185?img=22", name: "Jake Johnson", alias: "Peter B. Parker" }
        ]
    },
    {
        title: "The Shawshank Redemption",
        rating: "9.3",
        upvotes: 201000,
        posterUrl: tmdbImage("w500", "/9cqNxx0GxF0bflZmeSMuL5tnGzr.jpg"),
        genres: ["Drama"],
        cast: [
            { profilePicture: "https://i.pravatar.cc/185?img=23", name: "Tim Robbins", alias: "Andy Dufresne" },
            { profilePicture: "https://i.pravatar.cc/185?img=24", name: "Morgan Freeman", alias: "Ellis Boyd Redding" }
        ]
    },
    {
        title: "Everything Everywhere All at Once",
        rating: "7.8",
        upvotes: 96000,
        posterUrl: tmdbImage("w500", "/w3LxiVYdWWRvEVdn5RYq6jIqkb1.jpg"),
        genres: ["Action", "Adventure", "Comedy"],
        cast: [
            { profilePicture: "https://i.pravatar.cc/185?img=25", name: "Michelle Yeoh", alias: "Evelyn Wang" },
            { profilePicture: "https://i.pravatar.cc/185?img=26", name: "Ke Huy Quan", alias: "Waymond Wang" }
        ]
    }
];

try {
    await AppDataSource.connect();
    await Movies.deleteMany({});
    await Movies.insertMany(movies);
    console.log(`${movies.length} movies seeded successfully.`);
} catch (error) {
    console.error("Movie seeding failed:", error);
    process.exitCode = 1;
} finally {
    await mongoose.disconnect();
}