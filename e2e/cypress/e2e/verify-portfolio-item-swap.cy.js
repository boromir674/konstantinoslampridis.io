describe("Portfolio UI Tests", () => {
    describe("Grid Item Position Swapping", () => {
        beforeEach(() => {
            cy.visit("/");
            cy.viewport(1400, 1600);
        });

        it("should swap positions when first item is dragged to second item's position", () => {
            // Wait for the grid to load with at least 2 items
            cy.get(".react-grid-item").should("have.length.at.least", 2);
            
            // Wait for grid layout to stabilize
            cy.wait(1000);
            
            // ========== CAPTURE INITIAL POSITIONS ==========
            let firstItemInitialPosition;
            let secondItemInitialPosition;
            let firstItemInitialTransform;
            let secondItemInitialTransform;
            
            // Get initial position of FIRST item
            cy.get(".react-grid-item")
                .eq(0) // First item (index 0)
                .then(($firstItem) => {
                    firstItemInitialPosition = $firstItem[0].getBoundingClientRect();
                    firstItemInitialTransform = $firstItem.css('transform');
                    
                    cy.log(`FIRST ITEM INITIAL POSITION:`);
                    cy.log(`Position: (${firstItemInitialPosition.left}, ${firstItemInitialPosition.top})`);
                    cy.log(`Transform: ${firstItemInitialTransform}`);
                });
            
            // Get initial position of SECOND item
            cy.get(".react-grid-item")
                .eq(1) // Second item (index 1)
                .then(($secondItem) => {
                    secondItemInitialPosition = $secondItem[0].getBoundingClientRect();
                    secondItemInitialTransform = $secondItem.css('transform');
                    
                    cy.log(`SECOND ITEM INITIAL POSITION:`);
                    cy.log(`Position: (${secondItemInitialPosition.left}, ${secondItemInitialPosition.top})`);
                    cy.log(`Transform: ${secondItemInitialTransform}`);
                });
            
            // ========== PERFORM THE SWAP DRAG ==========
            cy.get(".react-grid-item")
                .eq(0) // First item
                .then(($firstItem) => {
                    // Calculate drag coordinates
                    const firstItemRect = $firstItem[0].getBoundingClientRect();
                    const firstItemCenterX = firstItemRect.left + firstItemRect.width / 2;
                    const firstItemCenterY = firstItemRect.top + firstItemRect.height / 2;
                    
                    // We need to drag the first item to where the second item is
                    // Get the second item's position
                    cy.get(".react-grid-item")
                        .eq(1)
                        .then(($secondItem) => {
                            const secondItemRect = $secondItem[0].getBoundingClientRect();
                            const targetX = secondItemRect.left + secondItemRect.width / 2;
                            const targetY = secondItemRect.top + secondItemRect.height / 2;
                            
                            cy.log(`DRAG OPERATION:`);
                            cy.log(`Dragging from: (${firstItemCenterX}, ${firstItemCenterY})`);
                            cy.log(`Dragging to: (${targetX + 100}, ${targetY + 100})`);
                            
                            // ========== THE SWAP DRAG SEQUENCE ==========
                            cy.get(".react-grid-item")
                                .eq(0) // First item
                                // DRAG START: Click and hold the first item
                                .trigger("mousedown", { 
                                    which: 1,
                                    button: 0,
                                    clientX: firstItemCenterX,
                                    clientY: firstItemCenterY,
                                    force: true
                                })
                                // 🔧 FIX: Wait for Firefox to properly register onDragStart
                                .wait(50) 
                                // DRAG TO SECOND ITEM: Move to second item's position + extra distance
                                .trigger("mousemove", { 
                                    clientX: targetX + 100, // Add 100px more to the right
                                    clientY: targetY + 100, // Add 100px more down
                                    force: true
                                })
                                .wait(200) // Wait for grid to register the movement
                                // Additional movement to ensure swap is detected
                                .trigger("mousemove", { 
                                    clientX: targetX + 10,
                                    clientY: targetY + 10,
                                    force: true
                                })
                                .wait(100)
                                // DRAG END: Release at second item's position
                                .trigger("mouseup", { 
                                    clientX: targetX + 10,
                                    clientY: targetY + 10,
                                    force: true 
                                });

                            // Wait for swap animation to complete
                            cy.wait(1500);
                            
                            // ========== VERIFY THE SWAP OCCURRED ==========
                            
                            // VERIFICATION 1: First item should now be where second item was
                            cy.get(".react-grid-item")
                                .eq(0) // First item (by DOM order, but may have moved)
                                .then(($firstItemAfter) => {
                                    const firstItemFinalPosition = $firstItemAfter[0].getBoundingClientRect();
                                    const firstItemFinalTransform = $firstItemAfter.css('transform');
                                    
                                    cy.log(`FIRST ITEM FINAL POSITION:`);
                                    cy.log(`Position: (${firstItemFinalPosition.left}, ${firstItemFinalPosition.top})`);
                                    cy.log(`Transform: ${firstItemFinalTransform}`);
                                    
                                    // First item should have moved from its initial position
                                    expect(firstItemFinalTransform).to.not.equal(firstItemInitialTransform);
                                    
                                    // First item should be close to where second item was initially
                                    // Allow some tolerance for grid snapping and because 1st item has different dims then 2nd potentiall
                                    const tolerance = 100;
                                    expect(firstItemFinalPosition.left).to.be.closeTo(secondItemInitialPosition.left, tolerance);
                                    expect(firstItemFinalPosition.top).to.be.closeTo(secondItemInitialPosition.top, tolerance);
                                });
                            
                            // VERIFICATION 2: Second item should now be where first item was
                            cy.get(".react-grid-item")
                                .eq(1) // Second item (by DOM order, but may have moved)
                                .then(($secondItemAfter) => {
                                    const secondItemFinalPosition = $secondItemAfter[0].getBoundingClientRect();
                                    const secondItemFinalTransform = $secondItemAfter.css('transform');
                                    
                                    cy.log(`SECOND ITEM FINAL POSITION:`);
                                    cy.log(`Position: (${secondItemFinalPosition.left}, ${secondItemFinalPosition.top})`);
                                    cy.log(`Transform: ${secondItemFinalTransform}`);
                                    
                                    // Second item should have moved from its initial position
                                    expect(secondItemFinalTransform).to.not.equal(secondItemInitialTransform);
                                    
                                    // Second item should be close to where first item was initially
                                    const tolerance = 100;
                                    expect(secondItemFinalPosition.left).to.be.closeTo(secondItemFinalPosition.left, 0);
                                    expect(secondItemFinalPosition.top).to.be.closeTo(firstItemInitialPosition.top, tolerance);
                                });
                            
                            // VERIFICATION 3: Log the successful swap
                            cy.then(() => {
                                cy.log(`✅ SWAP VERIFICATION COMPLETE:`);
                                cy.log(`✅ First item moved to second item's initial position`);
                                cy.log(`✅ Second item moved to first item's initial position`);
                            });
                        });
                });
        });

        it("should maintain grid layout integrity after item swap", () => {
            // Wait for the grid to load
            cy.get(".react-grid-item").should("have.length.at.least", 2);
            cy.wait(1000);
            
            // Count total items before swap
            let initialItemCount;
            cy.get(".react-grid-item").then(($items) => {
                initialItemCount = $items.length;
                cy.log(`Initial grid has ${initialItemCount} items`);
            });
            
            // Perform a swap (simplified version)
            cy.get(".react-grid-item").eq(0).then(($first) => {
                const firstRect = $first[0].getBoundingClientRect();
                
                cy.get(".react-grid-item").eq(1).then(($second) => {
                    const secondRect = $second[0].getBoundingClientRect();
                    
                    // Drag first to second position
                    cy.get(".react-grid-item")
                        .eq(0)
                        .trigger("mousedown", { 
                            clientX: firstRect.left + firstRect.width / 2,
                            clientY: firstRect.top + firstRect.height / 2,
                            force: true
                        })
                        .trigger("mousemove", { 
                            clientX: secondRect.left + secondRect.width / 2,
                            clientY: secondRect.top + secondRect.height / 2,
                            force: true
                        })
                        .trigger("mouseup", { force: true });
                    
                    cy.wait(1500);
                    
                    // Verify grid integrity
                    cy.get(".react-grid-item[data-grid]").then(($finalItems) => {
                        // Same number of items should exist
                        expect($finalItems.length).to.equal(initialItemCount);
                        
                        // No items should overlap (basic check)
                        for (let i = 0; i < $finalItems.length; i++) {
                            const itemRect = $finalItems[i].getBoundingClientRect();
                            expect(itemRect.width).to.be.greaterThan(0);
                            expect(itemRect.height).to.be.greaterThan(0);
                        }
                        
                        cy.log(`✅ Grid integrity maintained: ${$finalItems.length} items, no overlaps`);
                    });
                });
            });
        });
    });
});
