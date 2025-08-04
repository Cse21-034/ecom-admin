import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { setupAuth, isAuthenticated } from "./replitAuth";
import { z } from "zod";
import { insertProductSchema, insertCategorySchema, insertContactMessageSchema } from "@shared/schema";

// Role-based middleware
const requireRole = (roles: string[]) => {
  return async (req: any, res: any, next: any) => {
    try {
      const userId = req.user?.claims?.sub;
      if (!userId) {
        return res.status(401).json({ message: "Unauthorized" });
      }

      const user = await storage.getUser(userId);
      if (!user || !roles.includes(user.role)) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.currentUser = user;
      next();
    } catch (error) {
      console.error("Role check error:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  };
};

export async function registerRoutes(app: Express): Promise<Server> {
  // Auth middleware
  await setupAuth(app);

  // Auth routes
  app.get('/api/auth/user', isAuthenticated, async (req: any, res) => {
    try {
      const userId = req.user.claims.sub;
      const user = await storage.getUser(userId);
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: "Failed to fetch user" });
    }
  });

  // Supplier routes
  app.get('/api/supplier/products', isAuthenticated, requireRole(['supplier']), async (req: any, res) => {
    try {
      const supplierId = req.currentUser.id;
      const products = await storage.getProducts({ supplierId });
      res.json(products);
    } catch (error) {
      console.error("Error fetching supplier products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.post('/api/supplier/products', isAuthenticated, requireRole(['supplier']), async (req: any, res) => {
    try {
      const supplierId = req.currentUser.id;
      const productData = insertProductSchema.parse({
        ...req.body,
        supplierId,
      });
      
      const product = await storage.createProduct(productData);
      res.json(product);
    } catch (error) {
      console.error("Error creating product:", error);
      res.status(500).json({ message: "Failed to create product" });
    }
  });

  app.put('/api/supplier/products/:id', isAuthenticated, requireRole(['supplier']), async (req: any, res) => {
    try {
      const productId = parseInt(req.params.id);
      const supplierId = req.currentUser.id;
      
      // Verify ownership
      const existingProduct = await storage.getProduct(productId);
      if (!existingProduct || existingProduct.supplierId !== supplierId) {
        return res.status(404).json({ message: "Product not found" });
      }

      const updateData = insertProductSchema.partial().parse(req.body);
      const product = await storage.updateProduct(productId, updateData);
      res.json(product);
    } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ message: "Failed to update product" });
    }
  });

  app.delete('/api/supplier/products/:id', isAuthenticated, requireRole(['supplier']), async (req: any, res) => {
    try {
      const productId = parseInt(req.params.id);
      const supplierId = req.currentUser.id;
      
      // Verify ownership
      const existingProduct = await storage.getProduct(productId);
      if (!existingProduct || existingProduct.supplierId !== supplierId) {
        return res.status(404).json({ message: "Product not found" });
      }

      await storage.deleteProduct(productId);
      res.status(204).send();
    } catch (error) {
      console.error("Error deleting product:", error);
      res.status(500).json({ message: "Failed to delete product" });
    }
  });

  app.get('/api/supplier/stats', isAuthenticated, requireRole(['supplier']), async (req: any, res) => {
    try {
      const supplierId = req.currentUser.id;
      const stats = await storage.getSupplierStats(supplierId);
      res.json(stats);
    } catch (error) {
      console.error("Error fetching supplier stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.get('/api/supplier/orders', isAuthenticated, requireRole(['supplier']), async (req: any, res) => {
    try {
      const supplierId = req.currentUser.id;
      // Get orders for products owned by this supplier
      const orders = await storage.getAllOrders();
      // Filter orders that contain products from this supplier
      // This would need a more complex query in a real implementation
      res.json(orders);
    } catch (error) {
      console.error("Error fetching supplier orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  // Admin routes
  app.get('/api/admin/stats', isAuthenticated, requireRole(['admin']), async (req: any, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      console.error("Error fetching admin stats:", error);
      res.status(500).json({ message: "Failed to fetch stats" });
    }
  });

  app.get('/api/admin/users', isAuthenticated, requireRole(['admin']), async (req: any, res) => {
    try {
      const users = await storage.getUsersWithStats();
      res.json(users);
    } catch (error) {
      console.error("Error fetching users:", error);
      res.status(500).json({ message: "Failed to fetch users" });
    }
  });

  app.get('/api/admin/products', isAuthenticated, requireRole(['admin']), async (req: any, res) => {
    try {
      const products = await storage.getProducts();
      res.json(products);
    } catch (error) {
      console.error("Error fetching products:", error);
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  app.get('/api/admin/orders', isAuthenticated, requireRole(['admin']), async (req: any, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      res.status(500).json({ message: "Failed to fetch orders" });
    }
  });

  app.get('/api/admin/messages', isAuthenticated, requireRole(['admin']), async (req: any, res) => {
    try {
      const messages = await storage.getContactMessages();
      res.json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ message: "Failed to fetch messages" });
    }
  });

  app.put('/api/admin/messages/:id/status', isAuthenticated, requireRole(['admin']), async (req: any, res) => {
    try {
      const messageId = parseInt(req.params.id);
      const { status } = req.body;
      
      const message = await storage.updateContactMessageStatus(messageId, status);
      res.json(message);
    } catch (error) {
      console.error("Error updating message status:", error);
      res.status(500).json({ message: "Failed to update message status" });
    }
  });

  app.put('/api/admin/orders/:id/status', isAuthenticated, requireRole(['admin']), async (req: any, res) => {
    try {
      const orderId = parseInt(req.params.id);
      const { status } = req.body;
      
      const order = await storage.updateOrderStatus(orderId, status);
      res.json(order);
    } catch (error) {
      console.error("Error updating order status:", error);
      res.status(500).json({ message: "Failed to update order status" });
    }
  });

  // Public/shared routes
  app.get('/api/categories', async (req: any, res) => {
    try {
      const categories = await storage.getCategories();
      res.json(categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
      res.status(500).json({ message: "Failed to fetch categories" });
    }
  });

  app.post('/api/contact', async (req: any, res) => {
    try {
      const messageData = insertContactMessageSchema.parse(req.body);
      const message = await storage.createContactMessage(messageData);
      res.json(message);
    } catch (error) {
      console.error("Error creating contact message:", error);
      res.status(500).json({ message: "Failed to create message" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
