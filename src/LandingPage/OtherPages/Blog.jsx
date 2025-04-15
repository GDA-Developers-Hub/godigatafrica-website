import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { format } from "date-fns";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import axios from "axios";
import Swal from "sweetalert2";
import { BASE_URL } from "../../Utils/BaseUrl";
import { PageSEO } from "../../SEO";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [likedPosts, setLikedPosts] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const postsPerPage = 6;
  const [totalPages, setTotalPages] = useState(1);

  // Function to extract the first 30 words
  const getPreview = (content) => {
    const words = content.split(" ");
    return words.length > 30 ? words.slice(0, 30).join(" ") + "..." : content;
  };

  // Fetch blogs from API
  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}/blogs/`);
        setBlogs(response.data);
        setTotalPages(Math.ceil(response.data.length / postsPerPage));
        setLoading(false);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        // Swal.fire("Error", "Failed to load blog posts", "error");
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleLike = async (postId) => {
    try {
      await axios.post(`${BASE_URL}/blogs/${postId}/like/`);
      setLikedPosts((prev) =>
        prev.includes(postId)
          ? prev.filter((id) => id !== postId)
          : [...prev, postId]
      );
    } catch (error) {
      console.error("Error liking post:", error);
      Swal.fire("Error", "Failed to update like status", "error");
    }
  };

  const handleReadMore = (blog) => {
    setSelectedBlog(blog);
  };

  // Slice the blogs for current pagination
  const displayedBlogs = blogs.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <section className="relative overflow-hidden">
      <PageSEO page="blog" />
      {/* Background */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-[var(--card-background)] via-[var(--background-light)] to-white" /> */}

      <div className="text-center mb-16 w-full bg-[var(--card-background)] py-30">
          <span className="text-[var(--text-primary)] font-bold mb-2 tracking-wider text-sm uppercase">
            Latest Insights
          </span>
          <h2 className="text-3xl md:text-5xl font-bold mb-1 text-white">
            Our{" "}
            <span className="text-transparent bg-clip-text bg-white">
              Blog
            </span>
          </h2>
          <div className="h-1 w-24 bg-white mx-auto mb-2 rounded-full" />
          <p className="text-lg text-[var(--text-secondary)] font-bold max-w-3xl mx-auto">
            Stay updated with the latest trends, insights, and best practices in web development,
            design, and digital marketing.
          </p>
        </div>

      <div className="container mx-auto px-4 relative">
    

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-white">Loading blog posts...</div>
          </div>
        ) : (
          <>
            {selectedBlog ? (
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 p-8 mb-12">
                <button
                  onClick={() => setSelectedBlog(null)}
                  className="mb-6 text-[var(--text-primary)] font-bold hover:text-cyan-300 flex items-center"
                >
                  <ChevronLeft className="w-5 h-5 mr-1" /> Back to blogs
                </button>
                
                <div className="mb-6">
                  <img
                    src={selectedBlog.image || "/placeholder.svg"}
                    alt={selectedBlog.title}
                    className="w-full h-130 object-cover rounded-lg mb-6"
                  />

                  <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">{selectedBlog.title}</h1>
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full overflow-hidden">
                        <img
                          src={selectedBlog.author_avatar}
                          alt={selectedBlog.author_name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="text-[var(--text-primary)] font-bold">{selectedBlog.author_name}</p>
                        <p className="text-[var(--text-primary)] text-sm">{selectedBlog.author_role}</p>
                      </div>
                    </div>
                    
                    <div className="text-[var(--text-primary)] text-sm">
                      {format(new Date(selectedBlog.date), "MMMM d, yyyy")}
                    </div>
                    
                    <button
                      onClick={() => handleLike(selectedBlog.id)}
                      className="flex items-center gap-1 text-red-600 font-bold hover:text-red-400 transition-colors duration-300"
                    >
                      <Heart
                        className={`h-5 w-5 ${
                          likedPosts.includes(selectedBlog.id)
                            ? "fill-red-400 text-red-400"
                            : ""
                        }`}
                      />
                      <span>{selectedBlog.likes + (likedPosts.includes(selectedBlog.id) ? 1 : 0)}</span>
                    </button>
                  </div>
                  
                  {/* Blog content - using dangerouslySetInnerHTML to render HTML content */}
                  <div 
                    className="text-[var(--text-primary)] leading-relaxed"
                    dangerouslySetInnerHTML={{ 
                      __html: selectedBlog.content || selectedBlog.excerpt 
                    }}
                  />
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {displayedBlogs.map((blog, index) => (
                  <motion.article
                    key={blog.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="group relative bg-[var(--background)] backdrop-blur-sm rounded-2xl overflow-hidden border border-white/10 hover:border-cyan-500/30 transition-all duration-300"
                  >
                    {/* Image */}
                    <div className="relative h-48 overflow-hidden">
                      <img
                        src={blog.image || "/placeholder.svg"}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-60" />
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-4 text-sm text-white">
                        <time dateTime={blog.date}>
                          {format(new Date(blog.date), "MMMM d, yyyy")}
                        </time>
                        <span className="w-1 h-1 rounded-full bg-slate-600" />
                        <span>{blog.author_role}</span>
                      </div>

                      <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                        {blog.title}
                      </h3>

                      <div className="text-slate-100 mb-2">
                        {/* Using dangerouslySetInnerHTML for HTML content with 30-word limit */}
                        <div dangerouslySetInnerHTML={{ 
                          __html: getPreview(blog.content || blog.excerpt) 
                        }} />
                        
                        <button
                          onClick={() => handleReadMore(blog)}
                          className="mt-2 text-cyan-400 font-bold hover:underline text-sm"
                        >
                          Read More
                        </button>
                      </div>

                      {/* Author and Likes */}
                      <div className="flex items-center justify-between mt-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full overflow-hidden">
                            <img
                              src={blog.author_avatar}
                              alt={blog.author_name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="text-sm">
                            <p className="text-white font-bold">{blog.author_name}</p>
                            <p className="text-slate-100 font-medium">{blog.author_role}</p>
                          </div>
                        </div>

                        <button
                          onClick={() => handleLike(blog.id)}
                          className="flex items-center gap-1 text-red-600 font-bold hover:text-cyan-400 transition-colors duration-300"
                        >
                          <Heart
                            className={`h-5 w-5 ${
                              likedPosts.includes(blog.id)
                                ? "fill-red-500 text-red-500"
                                : ""
                            }`}
                          />
                          <span>{blog.likes + (likedPosts.includes(blog.id) ? 1 : 0)}</span>
                        </button>
                      </div>
                    </div>

                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </motion.article>
                ))}
              </div>
            )}

            {/* Pagination - only show when not viewing a single blog */}
            {!selectedBlog && blogs.length > 0 && (
              <div className="flex justify-center gap-4 p-6">
                <button
                  onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                  className=" bg-[var(--logo-bg)] text-black hover:bg-cyan-500/10 px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <ChevronLeft className="h-4 w-4 mr-2 inline-block" />
                  Previous
                </button>
                <button
                  onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                  className=" bg-[var(--logo-bg)] text-black hover:bg-cyan-500/10 px-4 py-2 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                  <ChevronRight className="h-4 w-4 ml-2 inline-block" />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
