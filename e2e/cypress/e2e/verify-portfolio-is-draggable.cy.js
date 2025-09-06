describe("dnd spec", () => {
    beforeEach(() => {
        cy.visit("/");
        cy.viewport(1400, 1600);
    });

    it("should drag-and-drop to the right, such that it exchanges position with neighbour", () => {
        // Wait for the grid to load
        cy.get(".react-grid-item").should("have.length.at.least", 1);
        
        // Wait for grid layout to stabilize
        cy.wait(1000);
        
        // Get the initial position of the first item
        cy.get(".react-grid-item")
            .first()
            .then(($firstItem) => {
                const initialRect = $firstItem[0].getBoundingClientRect();
                const initialTransform = $firstItem.css('transform');
                
                // Extract initial translateX value for comparison
                let initialTranslateX = 10; // default value
                if (initialTransform.includes('matrix')) {
                    const matrix = initialTransform.match(/matrix\(([^)]+)\)/);
                    if (matrix) {
                        const values = matrix[1].split(',').map(v => parseFloat(v.trim()));
                        initialTranslateX = values[4];
                    }
                }
                
                // ========== DRAG OPERATION EXPLAINED ==========
                // To simulate a drag operation, we need to:
                // 1. Calculate WHERE to start the drag (center of the element)
                // 2. Calculate WHERE to end the drag (target position)
                // 3. Send mouse events in sequence: mousedown -> mousemove(s) -> mouseup
                
                // STEP 1: Calculate the CENTER point of the element to start dragging from
                const centerX = initialRect.left + initialRect.width / 2;   // X coordinate of element center
                const centerY = initialRect.top + initialRect.height / 2;   // Y coordinate of element center
                const targetX = centerX + 300; // STEP 2: Target position (300px to the right)
                
                // ========== THE ACTUAL DRAG SEQUENCE ==========
                cy.get(".react-grid-item")
                    .first()
                    // DRAG START: Simulate pressing mouse button DOWN at the center of the element
                    .trigger("mousedown", { 
                        which: 1,        // Left mouse button
                        button: 0,       // Primary button (left click)
                        clientX: centerX, // Start X position (center of element)
                        clientY: centerY, // Start Y position (center of element)
                        force: true      // Force the event even if element is not visible
                    })
                    // DRAG MOVE 1: Move mouse to target position while button is still down
                    .trigger("mousemove", { 
                        clientX: targetX,  // New X position (300px to the right)
                        clientY: centerY,  // Keep same Y position (horizontal drag only)
                        force: true
                    })
                    .wait(200) // Wait for the drag library to register the movement
                    // DRAG MOVE 2: Additional small movement to ensure drag is detected
                    // Some drag libraries need multiple mousemove events to properly trigger
                    .trigger("mousemove", { 
                        clientX: targetX + 50, // Move slightly further right
                        clientY: centerY,      // Keep same Y position
                        force: true
                    })
                    .wait(100) // Short wait before releasing
                    // DRAG END: Release the mouse button at final position
                    .trigger("mouseup", { 
                        clientX: targetX + 50, // End position (350px total movement)
                        clientY: centerY,      // Same Y position
                        force: true 
                    });

                // Wait for the animation/layout to settle
                cy.wait(1000);

                // Verify the item has moved by checking the transform property
                cy.get(".react-grid-item")
                    .first()
                    .should(($item) => {
                        const newTransform = $item.css('transform');
                        const newRect = $item[0].getBoundingClientRect();
                        
                        // The transform should be different from initial
                        expect(newTransform).to.not.equal(initialTransform);
                        
                        // Parse the matrix transform to check actual translation
                        if (newTransform.includes('matrix')) {
                            const matrix = newTransform.match(/matrix\(([^)]+)\)/);
                            if (matrix) {
                                const values = matrix[1].split(',').map(v => parseFloat(v.trim()));
                                const translateX = values[4]; // 5th value in matrix is translateX
                                
                                // Verify that translateX has changed from initial position
                                expect(translateX).to.not.equal(initialTranslateX);
                                // And verify it has increased (moved right)
                                expect(translateX).to.be.greaterThan(initialTranslateX);
                            }
                        } else {
                            // Fallback: check bounding rect position has changed
                            expect(newRect.left).to.be.greaterThan(initialRect.left);
                        }
                    });
            });
    });

    it("should drag-and-drop downwards (vertical movement)", () => {
        // Wait for the grid to load
        cy.get(".react-grid-item").should("have.length.at.least", 1);
        
        // Wait for grid layout to stabilize
        cy.wait(1000);
        
        // Get the initial position of the first item
        cy.get(".react-grid-item")
            .first()
            .then(($firstItem) => {
                const initialRect = $firstItem[0].getBoundingClientRect();
                const initialTransform = $firstItem.css('transform');
                
                // Extract initial translateY value for comparison
                let initialTranslateY = 10; // default value
                if (initialTransform.includes('matrix')) {
                    const matrix = initialTransform.match(/matrix\(([^)]+)\)/);
                    if (matrix) {
                        const values = matrix[1].split(',').map(v => parseFloat(v.trim()));
                        initialTranslateY = values[5]; // 6th value in matrix is translateY
                    }
                }
                
                // ========== VERTICAL DRAG OPERATION ==========
                // Similar to horizontal drag, but we move the Y coordinate instead
                
                const centerX = initialRect.left + initialRect.width / 2;   // Keep X position constant
                const centerY = initialRect.top + initialRect.height / 2;   // Start Y position
                const targetY = centerY + 500; // MOVE 500px DOWN (vertical movement)
                
                cy.get(".react-grid-item")
                    .first()
                    // START: Press mouse button at element center
                    .trigger("mousedown", { 
                        which: 1,
                        button: 0,
                        clientX: centerX, // Keep X the same
                        clientY: centerY, // Start Y position
                        force: true
                    })
                    // MOVE DOWN: Move mouse downward while button is pressed
                    .trigger("mousemove", { 
                        clientX: centerX,  // Keep X the same (no horizontal movement)
                        clientY: targetY,  // New Y position (200px down)
                        force: true
                    })
                    .wait(200)
                    // Additional movement to ensure drag is detected
                    .trigger("mousemove", { 
                        clientX: centerX,      // Keep X the same
                        clientY: targetY + 50, // Move slightly further down
                        force: true
                    })
                    .wait(100)
                    // RELEASE: Drop the element at final position
                    .trigger("mouseup", { 
                        clientX: centerX,      // Same X position
                        clientY: targetY + 50, // Final Y position (250px total movement)
                        force: true 
                    });

                // Wait for animation to complete
                cy.wait(1000);

                // Verify the item has moved vertically
                cy.get(".react-grid-item")
                    .first()
                    .should(($item) => {
                        const newTransform = $item.css('transform');
                        
                        // The transform should be different from initial
                        expect(newTransform).to.not.equal(initialTransform);
                        
                        // Parse the matrix transform to check vertical translation
                        if (newTransform.includes('matrix')) {
                            const matrix = newTransform.match(/matrix\(([^)]+)\)/);
                            if (matrix) {
                                const values = matrix[1].split(',').map(v => parseFloat(v.trim()));
                                const translateY = values[5]; // 6th value in matrix is translateY
                                
                                // Verify that translateY has increased (moved down)
                                expect(translateY).to.not.equal(initialTranslateY);
                                expect(translateY).to.be.greaterThan(initialTranslateY);
                            }
                        }
                    });
            });
    });

    it("should resize bigger using bottom-right resize handle", () => {
        // Wait for the grid to load
        cy.get(".react-grid-item").should("have.length.at.least", 1);
        
        // Wait for grid layout to stabilize
        cy.wait(1000);
        
        // Get the initial size of the first item
        cy.get(".react-grid-item")
            .first()
            .then(($firstItem) => {
                const initialRect = $firstItem[0].getBoundingClientRect();
                const initialWidth = initialRect.width;
                const initialHeight = initialRect.height;
                
                // ========== RESIZE OPERATION EXPLAINED ==========
                // React Grid Layout items have a resize handle in the bottom-right corner
                // The resize handle is a specific DOM element with class 'react-resizable-handle-se'
                // It's a 20px × 20px element positioned at bottom: 0, right: 0 of the grid item
                // We need to target this specific element, not calculate arbitrary coordinates
                
                // STEP 1: First verify the grid item exists and get its info
                cy.get(".react-grid-item")
                    .first()
                    .should("be.visible")
                    .then(($gridItem) => {
                        cy.log(`Grid item found with classes: ${$gridItem.attr('class')}`);
                        cy.log(`Grid item size: ${$gridItem.width()}px × ${$gridItem.height()}px`);
                    });

                // STEP 2: Look for the resize handle and verify it exists
                cy.get(".react-grid-item")
                    .first()
                    .find(".react-resizable-handle-se") // This is the actual bottom-right resize handle
                    .should("exist")
                    .should("be.visible")
                    .then(($resizeHandle) => {
                        cy.log(`Resize handle found! Classes: ${$resizeHandle.attr('class')}`);
                        cy.log(`Resize handle size: ${$resizeHandle.width()}px × ${$resizeHandle.height()}px`);
                        
                        // Get the exact position of the resize handle element
                        const handleRect = $resizeHandle[0].getBoundingClientRect();
                        cy.log(`Resize handle position: left=${handleRect.left}, top=${handleRect.top}, right=${handleRect.right}, bottom=${handleRect.bottom}`);
                        
                        const handleCenterX = handleRect.left + handleRect.width / 2;   // Center of the 20px handle
                        const handleCenterY = handleRect.top + handleRect.height / 2;   // Center of the 20px handle
                        
                        cy.log(`Resize handle center: (${handleCenterX}, ${handleCenterY})`);
                        
                        // STEP 3: Hover over the resize handle first to verify we can target it
                        cy.wrap($resizeHandle)
                            .trigger("mouseover", { force: true })
                            .wait(500); // Let user see the hover effect
                        
                        // ========== RESIZE BIGGER ==========
                        const biggerTargetX = handleCenterX + 150; // Drag 150px to the right from handle center
                        const biggerTargetY = handleCenterY + 100; // Drag 100px down from handle center
                        
                        cy.log(`Target drag position: (${biggerTargetX}, ${biggerTargetY})`);
                        
                        // STEP 4: Perform the actual resize drag on the handle element
                        cy.wrap($resizeHandle)
                            // RESIZE START: Click and hold at the CENTER of the resize handle
                            .trigger("mousedown", { 
                                which: 1,
                                button: 0,
                                clientX: handleCenterX, // Start at the center of the actual resize handle
                                clientY: handleCenterY, // Start at the center of the actual resize handle
                                force: true
                            })
                            .wait(100) // Small wait to register mousedown
                            // RESIZE DRAG: Move the handle outward to make element bigger
                            .trigger("mousemove", { 
                                clientX: biggerTargetX, // Move right (bigger width)
                                clientY: biggerTargetY, // Move down (bigger height)
                                force: true
                            })
                            .wait(200)
                            // Additional movement to ensure resize is detected
                            .trigger("mousemove", { 
                                clientX: biggerTargetX + 10,
                                clientY: biggerTargetY + 10,
                                force: true
                            })
                            .wait(100)
                            // RESIZE END: Release mouse to complete the resize
                            .trigger("mouseup", { 
                                clientX: biggerTargetX + 10,
                                clientY: biggerTargetY + 10,
                                force: true 
                            });

                        
                        // Wait for resize animation to complete
                        cy.wait(1000);

                        // STEP 5: Verify the item got bigger
                        cy.get(".react-grid-item")
                            .first()
                            .then(($item) => {
                                const newRect = $item[0].getBoundingClientRect();
                                const newWidth = newRect.width;
                                const newHeight = newRect.height;
                                
                                // Log the comparison for debugging (using cy.then, not cy.should)
                                cy.log(`RESIZE VERIFICATION:`);
                                cy.log(`Initial size: ${initialWidth}px × ${initialHeight}px`);
                                cy.log(`Final size: ${newWidth}px × ${newHeight}px`);
                                cy.log(`Width change: ${newWidth - initialWidth}px`);
                                cy.log(`Height change: ${newHeight - initialHeight}px`);
                                
                                // Now perform assertions without cy.log inside
                                expect(newWidth).to.be.greaterThan(initialWidth);
                                expect(newHeight).to.be.greaterThan(initialHeight);
                            });
                    });
            });
    });
});





// describe("dnd spec", () => {
//     // make viewport bigger than 100x600
//       // we can do it in a beforeEach hook
//     beforeEach(() => {
//         cy.visit("/");
//         cy.viewport(1400, 1600);
//       });

//     it("should drag-and-drop to the right, such that it exchanges position with neighbour", () => {
  
//         // governs the amount of drag to the right
//         const rightDrag = 800;

//         cy
//         // retrieving 1st Portfolio Item, such as below
//         // <div class="react-grid-layout layout" style="height: 2101px;"><div data-grid="[object Object]" class="react-grid-item react-draggable cssTransforms react-resizable css-2p0njl e1nz4p5p1" 
//         .get(".react-grid-item")
//         .first()
//         .then((item) => {
//             // drag-n-drop happens on the surface of each item
//             // we need to drag the item to the right by 800px
//             item.trigger("mousedown", { which: 1, force: true });
//             item.trigger("mousemove", { clientX: 1100, clientY: 0, force: true });
//             item.trigger("mouseup", { force: true });

//             // cy
//             // // drag-n-drop the item to the right by 800px
//             // .drag(".react-grid-item", rightDrag, 0);
            
//             // // required objects for doing drag-n-drop
//             // item.trigger("mousedown", { which: 1, force: true });
//             // // move a lot to the right
//             // item.trigger("mousemove", { clientX: 800, clientY: 0, force: true });
//             // item.trigger("mouseup", { force: true });
            


// // based on where an item is at the moment the styles change:
// // outline: rgb(133, 115, 113) solid 3px; width: 670px; height: 270px; position: absolute; transform: translate(10px, 10px);
// // specifically: transform: translate(10px, 10px) is changing and we use to assert the expected position after drag-n-drop
        
//     // assert CSS transorf property after drag an drop is
//     // transform: translate(690px, 10px);

//         // we need to assert the position of the item after drag-n-drop
//         // we need to assert the "transform" CSS property
//         // we need to assert the "translate" function
//         cy
//             .get(".react-grid-item")
//             .first()
//             .should("have.css", "transform", "translate(800px, 0px)");

            


//         const expectedTranslate = 800;

//         cy
//             // retrieving the input HTML element
//             .get(".react-grid-item")
//             .first()
//             // we should somehow make an assertion about the position
//             .should("have.css", "transform", `translate(${expectedTranslate}px, 0px)`);

//             // getting the "value" HTML attribute

//             // .invoke("attr", "value")
//             // .then((value) => {
//             //   // calculating the expected value
//             //   const expectedValue = `${maxValue * targetValue}`;
  
//             //   cy.wrap(value).should("be.eq", expectedValue);
//             });

//         });
//     });
// //   });
